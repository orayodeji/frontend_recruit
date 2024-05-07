/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useSpring } from "react-spring";
import {
  ModalContainer,
  // ModalHead,
  ModalSpace,
  // ModalTitle,
  ModalWrapper,
  PositionIcon,
} from "./modal.style";

import { MdOutlineCancel } from "react-icons/md";
function Modal({
  start,
  content,
  show,
  title,
  styleHead,
  onClose,
  size,
  spacing,
  iColor,
  pd,
}) {
  const modalAnimation = useSpring({
    from: {
      opacity: "0",
    },
    to: {
      opacity: "1",
    },
  });

  return (
    <ModalWrapper show={show.toString()} start={start.toString()}>
      <ModalSpace spacing={spacing} />
      <ModalContainer size={size} style={modalAnimation} pd={pd}>
        <PositionIcon iColor={iColor}>
          <MdOutlineCancel onClick={() => onClose(false)} />
        </PositionIcon>
        {/* <ModalHead style={styleHead} icolor={iColor}>
          <ModalTitle>{title}</ModalTitle>
        </ModalHead> */}
        {content}
      </ModalContainer>
    </ModalWrapper>
  );
}

Modal.propTypes = {
  start: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  content: PropTypes.element.isRequired,
  size: PropTypes.string,
  styleHead: PropTypes.bool,
};

Modal.defaultProps = {
  show: false,
  start: false,
};

export default Modal;
