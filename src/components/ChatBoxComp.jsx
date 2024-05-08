/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  ChatBox,
  ChatBoxDiv,
  ChatDiv,
  FormFlexDiv,
  TabContentWrapper,
} from "./modal.style";
import { MdSend } from "react-icons/md";
import colors from "../assets/colors.json";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const ChatBoxComp = ({ trails, loading, performAction }) => {
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");

  /**
   * @description This method is used to handle the Enter key press event in the chat input field.
   * When the Enter key is pressed, it checks if the message length is greater than 0.
   * If true, it calls the performAction function with the current message and clears the message state.
   * @param {Event} e - The event object representing the key press event.
   */
  const trackEnterKey = (e) => {
    if (e.key === "Enter") {
      console.log("do validate");
      if (message.length > 0) {
        performAction(message);
        setMessage("");
      }
    }
  };

  /**
   * @description This method is used to handle the submission of a chat message.
   * When the method is called, it logs a message to the console, checks if the message length is greater than 0,
   * and if true, calls the performAction function with the current message and clears the message state.
   */
  const commentSubmitForm = () => {
    console.log("Hello World");
    if (message.length > 0) {
      performAction(message);
      setMessage("");
    }
  };

  useEffect(() => {
    if (trails.length > 0) {
      console.log("insdie");
      const divElement = document.querySelector(".move-down");
      divElement.style.backgroundColor = "red";
      divElement.scrollTop = divElement.scrollHeight;
    }
  }, [trails]);

  return (
    <TabContentWrapper>
      <ChatDiv>
        <FormFlexDiv width="80%">
          <ChatBoxDiv className="move-down">
            {trails.length > 0 ? (
              trails.map((item, index) => (
                <ChatBox
                  msgType={item.user_id == user.id ? "outbox" : "inbox"}
                  key={index}
                >
                  <div>{item.message}</div>
                </ChatBox>
              ))
            ) : (
              <div style={{ textAlign: "center" }}>
                No Messages at the moment
              </div>
            )}
          </ChatBoxDiv>
          <div style={{ display: "flex", marginTop: "10px", width: "100%" }}>
            <input
              type="text"
              value={message}
              disabled={loading}
              onKeyDown={(e) => trackEnterKey(e)}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                borderRadius: "20px",
                width: "100%",
              }}
            />

            <button
              disabled={loading}
              type="button"
              style={{
                background: colors.primary,
                padding: "16px",
                fontSize: "25px",
                borderRadius: "50%",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "5px",
                cursor: "pointer",
              }}
              onClick={commentSubmitForm}
            >
              <MdSend style={{ color: "white" }} />
            </button>
          </div>
        </FormFlexDiv>
      </ChatDiv>
    </TabContentWrapper>
  );
};

ChatBoxComp.propTypes = {
  trails: PropTypes.array,
  loading: PropTypes.bool,
  performAction: PropTypes.func,
};
export default ChatBoxComp;
