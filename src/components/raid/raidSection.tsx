import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import config from "../../config.json";
import { FaCircleCheck } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon

const RaidSectionComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tweetDetails, setTweetDetails] = useState<any>(null); // State to store tweet details

  const [raidLink, setRaidLink] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [tweetId, setTweetId] = useState<string | null>(null);
  const [icon, setIcon] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);

  const [messageId, setMessageId] = useState<string | null>(null);
  const [target, setTarget] = useState<string | null>(null);
  const [smashes, setSmashes] = useState<string | null>(null);

  // Initialize Telegram WebApp
  const tg = (window as any).Telegram.WebApp;

  // Access initData and other WebApp data
  const initData = tg.initDataUnsafe;
  const userID = initData?.user?.id;
  const userName = initData?.user?.first_name;

  useEffect(() => {
    const fetchRaidMessage = async () => {
      try {
        const response = await fetch(
          `${config.SERVER_URL}/api/last/raid-message`
        );
        const data = await response.json();

        if (response.ok) {
          // Extract lastRaidMessage and lastActiveRaid from the response
          const { lastRaidMessage, lastActiveRaid } = data;

          // Destructure fields from lastRaidMessage if available
          if (lastRaidMessage) {
            const { raidLink, userId, icon, chatId, messageId } =
              lastRaidMessage;
            setRaidLink(raidLink);
            setUserId(userId);
            setIcon(icon);
            setChatId(chatId);
            setMessageId(messageId);

            const extractedTweetId = extractPostId(raidLink);
            setTweetId(extractedTweetId);
          }

          // Optionally, you can also access lastActiveRaid if needed
          if (lastActiveRaid) {
            const { target, smashes } = lastActiveRaid;
            // Handle smashes and targets as needed
            setTarget(target);
            setSmashes(smashes);
          }
        } else {
          console.error("Error fetching raid message:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRaidMessage();
  }, []);

  // Function to extract tweetId from raidLink
  const extractPostId = (link: string) => {
    const regex = /status\/(\d+)/; // Regex to extract tweet ID
    const match = link.match(regex);
    return match ? match[1] : null;
  };

  // Function to fetch tweet details
  async function getTweetDetails(tweetId: string | null) {
    if (!tweetId) {
      setError("Invalid tweet ID.");
      return;
    }

    setLoading(true); // Set loading state to true
    try {
      const response = await axios.get(
        `${config.SERVER_URL}/api/post/get-post/${tweetId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTweetDetails(response.data.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching tweet details:", error);
      setError("Failed to fetch tweet details.");
      setLoading(false); // Set loading to false in case of an error
    }
  }

  // Fetch the tweet details when the component mounts or tweetId changes
  useEffect(() => {
    if (tweetId) {
      getTweetDetails(tweetId);
    }
  }, [tweetId]);

  const smashRaid = () => {
    if (chatId) {
      if (messageId && userID && userName) {
        const payload = {
          messageId,
          userID,
          userName,
        };

        // Make an API request to your backend to trigger `smashRaid`
        axios
          .post(`${config.SERVER_URL}/api/smashRaid/${chatId}`, payload)
          .then((response) => {
            if (response.data.success) {
              openMiniApp(); // Pass the link to `openMiniApp` function
            } else {
              console.log("Raid could not be started:", response.data.message);
            }
          })
          .catch((error) => {
            console.error("Error triggering raid:", error);
          });
      }
    }
  };

  const openMiniApp = () => {
    if (raidLink) {
      window.open(raidLink, "_blank");
    } else {
      console.error("No raid link provided.");
    }
  };

  return (
    <Container>
      <div className="raidSection">
        <div>
          {loading ? (
            // Display a loading icon while fetching data
            <LoadingIcon>
              <FaSpinner className="spinner" />
            </LoadingIcon>
          ) : tweetDetails ? (
            <div className="tweet-details">
              <div className="topHeader">
                <img src={tweetDetails.user?.profileImageUrl} alt="Profile" />
                <div className="userDetails">
                  <h3>{tweetDetails.user?.name}</h3>
                  <span>@{tweetDetails.user?.username}</span>
                </div>
              </div>

              <p className="tweetDescription">{tweetDetails.text}</p>

              {tweetDetails.media && tweetDetails.media.length > 0 && (
                <div className="media-section">
                  {tweetDetails.media.map((mediaItem: any, index: number) => (
                    <div key={index}>
                      <img
                        src={mediaItem.url || mediaItem.preview_image_url}
                        alt="Media"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="smashes">
                <FaCircleCheck className="icon" /> {smashes}/{target} Smashes
              </div>

              <div className="gif">
                <img
                  src="https://raidsharksbot.com/ads/2024-10-21-Whiskey.gif"
                  alt="GIF"
                />
              </div>

              <div className="smashButton">
                <button onClick={smashRaid}>
                  {icon} SMASH IT {icon}
                </button>
              </div>
            </div>
          ) : (
            <p>No tweet details available.</p>
          )}
        </div>
      </div>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  background: var(--background-color);
  border-radius: 15px;
  padding: 17px;

  .error {
    color: red;
  }

  .tweet-details {
    .topHeader {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      display: flex;
      align-items: center;
      flex-direction: row;
      gap: 0.5rem;
      .userDetails {
        span {
          font-size: 14px;
        }
      }
    }
    .tweetDescription {
      font-size: 14px;
      font-weight: 500;
      margin: 2rem 0rem;
    }

    .media-section {
      padding-bottom: 1rem;
      border-bottom: 1px solid #f4f5f7;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .smashes {
      margin: 1rem 0rem;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      .icon {
        color: blue;
      }
    }
    .gif {
      margin-bottom: 2rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
    .smashButton {
      width: 100%;
      position: absolute;
      bottom: 0px;
      left: 0px;
      button {
        padding: 8px 12px;
        background-color: black;
        color: #fff;
        width: 100%;
        outline: none;
        &:hover {
          outline: none;
          border: 0;
        }
      }
    }
  }
`;

// Loading icon styling
const LoadingIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px; /* Adjust height as needed */
  .spinner {
    font-size: 2rem;
    color: #333;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default RaidSectionComponent;
