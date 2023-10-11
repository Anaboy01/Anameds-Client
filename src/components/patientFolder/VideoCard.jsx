import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa'; // Import the close icon from react-icons

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    position: 'relative',
    background: 'none',
    border: 'none',
    padding: 0,
    maxWidth: '90%',
    maxHeight: '90%',
    width: 'auto',
    height: 'auto',
    overflow: 'hidden',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  },
};

const VideoCard = ({ videoUrls }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');

  const openModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVideo('');
    setModalOpen(false);
  };

  return (
    <div className="flex flex-wrap">
      {videoUrls.map((videoUrl, index) => (
        <div key={index} className="max-w-sm w-full   rounded overflow-hidden shadow-lg m-2">
          <div
            className="cursor-pointer"
            onClick={() => openModal(videoUrl)}
          >
            <video controls className="w-full max-h-[20rem]">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
      >
        <div className="modal-content  bg-transparent flex items-center justify-center ">
          <video controls className="max-w-[40rem] max-h-[40rem]">
            <source src={selectedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button onClick={closeModal} className="modal-close-btn absolute top-1 right-1">
            <FaTimes className="text-white ns:block text-2xl" /> {/* Close icon */}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default VideoCard;
