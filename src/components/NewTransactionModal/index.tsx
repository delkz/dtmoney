import Modal from "react-modal";
import { Container,RadioBox,TransactionTypeContainer } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { FormEvent, useState } from "react";
import { api } from "../../services/api";
interface newTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: newTransactionModalProps) {
  const [type,setType] = useState('deposit');
  const [title,setTitle] = useState('');
  const [category,setCategory] = useState('');
  const [value,setValue] = useState(0);
  const handleCreateNewTransaction = (e : FormEvent) => {
    e.preventDefault();
    const data = {type,title,category,value};
    api.post('/transactions',data);
  };


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>
        <input value={title} onChange={event => setTitle(event.target.value)} placeholder="Titulo" />
        <input value={value} onChange={event => setValue(Number(event.target.value))} type="number" placeholder="Valor" />

        <TransactionTypeContainer>
          <RadioBox activeColor="green" isActive={type === 'deposit'} type="button" onClick={()=>{setType("deposit")}}><img src={incomeImg} alt="Entrada" /><span>Entrada</span></RadioBox>
          <RadioBox activeColor="red" isActive={type === 'withdraw'} type="button" onClick={()=>{setType("withdraw")}}><img src={outcomeImg} alt="Saida" /><span>Saida</span></RadioBox>
        </TransactionTypeContainer>


        <input value={category} onChange={event => setCategory(event.target.value)}  placeholder="Categoria" />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
