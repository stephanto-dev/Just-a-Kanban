import {Box, IconButton} from '@chakra-ui/react';
import { CardModel } from '../utils/models';
import { DeleteIcon } from '@chakra-ui/icons';
import { AutoresizeTextarea } from './AutoResizeTextarea';
import {useCallback, useState} from 'react'

type CardProps = {
  index: string;
  card: CardModel;
  onDelete: (id:CardModel['idCard']) => void;
  onUpdate: (id: CardModel['idCard'], updateCard: CardModel) => void;
}

function Card({card, onUpdate: handleUpdate, onDelete: handleDelete}:CardProps){

  const [text, setText] = useState<string>(card.text);

  function debounce<T extends (...args: any[]) => void>(callback: T, delay: number) {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => callback(...args), delay);
    };
  }

  const sendTextToServer = useCallback(debounce((textToSend: string) => {
    const newCard = {
      ...card,
      text: textToSend
    };
    handleUpdate(card.idCard, newCard); // Envia o texto atualizado para o servidor
  }, 1000), [card, handleUpdate]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setText(newText); // Atualiza o texto localmente no estado
    sendTextToServer(newText); // Envia o texto para o servidor usando debounce após 1 segundo de inatividade
  };


  const handleDeleteClick = () => {
    handleDelete(card.idCard)
  }


  return(
    <Box
      as="div"
      role="group"
      position="relative"
      rounded="lg"
      w={200}
      minW={200}
      h='fit-content'
      pl={3}
      pr={7}
      pt={3}
      pb={1}
      boxShadow="xl"
      cursor="grab"
      fontWeight="bold"
      bgColor={card.color}
      flexGrow={0}
      flexShrink={0}
    >
      <IconButton 
        position="absolute"
        top={0}
        right={0}
        zIndex={100}
        aria-label='delete-card'
        size="md"
        colorScheme='solid'
        color="gray.700"
        icon={<DeleteIcon/>}
        opacity={0}
        _groupHover={{
          opacity:1
        }}
        onClick={handleDeleteClick}
        marginLeft={2}
      />

      <AutoresizeTextarea
        value={text}
        fontWeight="semibold"
        cursor="inherit"
        border="none"
        p={0}
        resize="none"
        minH={70}
        maxH={200}
        focusBorderColor="none"
        color="gray.700"
        onChange={handleTitleChange}
      />
    </Box>
  );
}

export default Card;