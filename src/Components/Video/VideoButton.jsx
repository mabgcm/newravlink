import React from "react";
import { useModalVideo } from "./ModalVideoContext";
import { trackMetaCustom } from "../../analytics/metaPixel";

function VideoButton({ videoUrl }) {
  const { openModal } = useModalVideo();
  const handleClick = () => {
    trackMetaCustom("VideoPlay", {
      video_url: videoUrl,
    });
    openModal(videoUrl);
  };

  return (
    <button className="request-loader" onClick={handleClick} data-fbq-event="VideoPlayClick" data-fbq-label="hero-video">
        <i className="fa-solid fa-play"></i>
    </button>
  );
}

export default VideoButton;
