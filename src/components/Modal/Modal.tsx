import { Button, Modal } from "@skbkontur/react-ui";

type ModalProps = {
  onClose: () => void;
  result: string;
};

export const ModalWithResult = ({ onClose, result }: ModalProps) => {
  return (
    <Modal onClose={onClose}>
      <Modal.Header>Результаты вычислений</Modal.Header>
      <Modal.Body>
        <p>{result}</p>
      </Modal.Body>
      <Modal.Footer panel>
        <Button onClick={onClose}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};
