import {Button, Modal} from "react-bootstrap";

const ModalGameOver = ({scores, onRestart, onExit,  ...props}) => {
  return (
      <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Game over!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Очки: {scores}</h4>
          <p>
            {/*Сюда можно вставить тест*/}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onRestart}>Рестарт</Button>
          <Button onClick={onExit}>Выход</Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ModalGameOver;