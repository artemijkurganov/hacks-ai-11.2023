import { Button, Modal } from "@skbkontur/react-ui";

type ModalProps = {
  onClose: () => void;
  result: string;
};

export const ModalWithResult = ({ onClose, result }: ModalProps) => {
  const resultArr = result.split("\n");
  const resultArr2 = resultArr.slice(0, resultArr.length - 2);
  return (
    <Modal onClose={onClose}>
      <Modal.Header>Результаты вычислений</Modal.Header>
      <Modal.Body>
        {resultArr2.map((x) => {
          return <p>{x.split(" ").filter(x => x).join(" — ")}</p>;
        })}
      </Modal.Body>
      <Modal.Footer panel>
        <Button onClick={onClose}>Закрыть</Button>
      </Modal.Footer>
    </Modal>
  );
};
