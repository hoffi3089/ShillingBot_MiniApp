import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import config from "../../config.json";
import CounterComponent from "../Counter";
import SettingItemComponent from "./settingItem";

let settingsData = [
  {
    id: 1,
    title: "Chat mute",
    description: "Mutes the chat during a raid",
    isChecked: false,
  },
  {
    id: 2,
    title: "Finder",
    description: "Find Raid",
    isChecked: true,
  },
  {
    id: 3,
    title: "Lock Chat",
    description: "Lock Chat during a raid",
    isChecked: false,
  },
  {
    id: 4,
    title: "Live stats",
    description: "Interaction messages in the chat",
    isChecked: false,
  },
  {
    id: 5,
    title: "Tweet preview ",
    description: "Show a tweet preview in the chat",
    isChecked: false,
  },
  {
    id: 6,
    title: "Raid duration",
    description: "Elapsed time on raid finish",
    isChecked: false,
  },
  {
    id: 7,
    title: "Raid summary",
    description: "Post raid summary in the chat",
    isChecked: false,
  },
  {
    id: 8,
    title: "Verification-Only",
    description:
      "Require raiders to have their X account verified in order to smash the raids.",
    isChecked: false,
  },
  {
    id: 9,
    title: "Forward Raids",
    description: "Forward raids to RaidSharks private raiding groups.",
    isChecked: false,
  },
];

const SettingSection: React.FC = () => {
  const [settings, setSettings] = useState(settingsData);

  const [target, setTarget] = useState(100);
  const [repostCount, setRepostCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [presetTags, setPresetTags] = useState(["@FreedomShillingBot"]);
  const [inputValue, setInputValue] = useState(presetTags); // Local state for input

  // Initialize Telegram WebApp
  const tg = (window as any).Telegram.WebApp;

  // Access initData and other WebApp data
  const initData = tg.initDataUnsafe;

  const userId = initData?.user?.id;
  const chatType = initData?.chat?.type; // can be "private", "group", "supergroup", "channel"
  const chatId = initData?.chat?.id;

  useEffect(() => {
    const fetchSettings = async () => {
      // if (!chatId) return; // Only fetch if chatId is available

      setLoading(true);

      try {
        const response = await fetch(
          `${config.SERVER_URL}/api/group-settings/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // Map response data to match the settings structure
        const updatedSettings = [
          {
            id: 1,
            title: "Chat mute",
            description: "Mutes the chat during a raid",
            isChecked: data.mute,
          },
          {
            id: 2,
            title: "Finder",
            description: "Find Raid",
            isChecked: data.finderEnabled,
          },
          {
            id: 3,
            title: "Lock Chat",
            description: "Lock Chat during a raid",
            isChecked: data.chatLocked,
          },
          {
            id: 4,
            title: "Live stats",
            description: "Interaction messages in the chat",
            isChecked: data.liveStats,
          },
          {
            id: 5,
            title: "Tweet preview",
            description: "Show a tweet preview in the chat",
            isChecked: data.tweetPreview,
          },
          {
            id: 6,
            title: "Raid duration",
            description: "Elapsed time on raid finish",
            isChecked: data.raidDuration,
          },
          {
            id: 7,
            title: "Raid summary",
            description: "Post raid summary in the chat",
            isChecked: data.raidSummary,
          },
          {
            id: 8,
            title: "Verification-Only",
            description:
              "Require raiders to have their X account verified in order to smash the raids.",
            isChecked: data.verificationOnly,
          },
          {
            id: 9,
            title: "Forward Raids",
            description: "Forward raids to RaidSharks private raiding groups.",
            isChecked: data.forwardRaids,
          },
        ];

        // Update the state with fetched settings

        setSettings(updatedSettings);
        setTarget(data?.target);
        setRepostCount(data?.repostCount);
        setPresetTags(data?.raidSettings.presetTags);
        setInputValue(data?.raidSettings.presetTags);
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [chatId]);

  const updateSettings = async (
    newTarget?: any,
    newRepostCount?: any,
    updatedSettings?: any,
    newPresetTags?: any
  ) => {
    try {
      const response = await axios.patch(
        `${config.SERVER_URL}/api/group-settings/${userId}`,
        {
          target: newTarget,
          repostCount: newRepostCount,
          settings: updatedSettings,
          presetTags: newPresetTags,
        }
      );

      setTarget(newTarget);
      setRepostCount(newRepostCount);
      setSettings(updatedSettings); // Update the state
      setPresetTags(newPresetTags);
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  const handleIncrement = (type: any) => {
    if (type === "target") {
      updateSettings(target + 10, repostCount, settings, presetTags);
    } else {
      updateSettings(target, repostCount + 1, settings, presetTags);
    }
  };

  const handleDecrement = (type: any) => {
    if (type === "target" && target > 0) {
      updateSettings(target - 10, repostCount, settings, presetTags);
    } else if (type === "repostCount" && repostCount > 0) {
      updateSettings(target, repostCount - 1, settings, presetTags);
    }
  };

  const handleToggle = (id: number) => {
    const updatedSettings = settings.map((setting) =>
      setting.id === id
        ? { ...setting, isChecked: !setting.isChecked }
        : setting
    );

    setSettings(updatedSettings);

    // Send updated settings to the backend
    updateSettings(target, repostCount, updatedSettings, presetTags);
  };

  const handlePresetTags = () => {
    const tags = inputValue.join(" ").split(","); // split the input if there are multiple tags
    setPresetTags(tags);
    // Ensure you pass all the necessary parameters to updateSettings
    updateSettings(target, repostCount, settings, tags);
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value); // Update local input value
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handlePresetTags(); // Call when "Enter" is pressed
    }
  };
  return (
    <Container>
      <div className="settingSection">
        <h2>Raid Settings</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="content">
            <CounterComponent
              title="Targets"
              description="Number of smashes"
              value={target}
              onIncrement={() => handleIncrement("target")}
              onDecrement={() => handleDecrement("target")}
            />
            <CounterComponent
              title="Repost Count"
              description="Frequency of reposts"
              value={repostCount}
              onIncrement={() => handleIncrement("repostCount")}
              onDecrement={() => handleDecrement("repostCount")}
            />
            <div className="tags">
              <div className="left">
                <h4>Tags</h4>
                <div>Sets the tags that can be copied</div>
              </div>
              <div className="tagInput">
                <input
                  type="text"
                  value={inputValue} // Display local input value
                  onChange={handleInputChange} // Only update local state
                  onKeyPress={handleKeyPress} // Call function when "Enter" is pressed
                  onBlur={handlePresetTags} // Call function when input loses focus
                />
              </div>
            </div>

            {settings &&
              settings.map((setting) => (
                <SettingItemComponent
                  key={setting.id}
                  title={setting.title}
                  description={setting.description}
                  isChecked={setting.isChecked}
                  onChange={() => handleToggle(setting.id)}
                />
              ))}
          </div>
        )}
      </div>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  background: var(--background-color);
  border-radius: 15px;
  padding: 17px;
  h2 {
    font-weight: 500;
    font-size: 20px;
  }
  p {
    font-size: 14px;
    font-weight: 500;
  }
  .content {
    margin-top: 1.8rem;

    .tags {
      margin-top: 1.5rem;
      .left {
        div {
          font-size: 13px;
        }
      }
      .tagInput input {
        margin: 0.8rem 0rem;
        border-radius: 7px;
        padding: 7px 10px;
        width: 100%;
        border: none;
        outline: none;
        font-weight: bold;
        color: var(--text-color);
        background-color: rgba(145, 158, 171, 0.12);
      }
    }
  }

  .error {
    color: red;
  }
`;

export default SettingSection;
