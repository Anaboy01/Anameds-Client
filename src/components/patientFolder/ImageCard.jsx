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

const ImageCard = ({ imageUrls }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage('');
    setModalOpen(false);
  };

  return (
    <div className="flex flex-wrap">
      {imageUrls.map((imageUrl, index) => (
        <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-2">
          <img
            src={imageUrl}
            alt={`Image ${index + 1}`}
            className="h-full cursor-pointer"
            onClick={() => openModal(imageUrl)}
          />
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
      >
        <div className="modal-content p-4 bg-transparent">
          <img src={selectedImage} alt="Selected Image" className="max-h-full max-w-full" />
          <button onClick={closeModal} className="modal-close-btn absolute top-1 right-1">
            <FaTimes className="text-white text-2xl" /> {/* Close icon */}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ImageCard;
