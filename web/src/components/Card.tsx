import {Box, IconButton} from '@chakra-ui/react';
import { CardModel } from '../utils/models';
import { DeleteIcon } from '@chakra-ui/icons';
import { AutoresizeTextarea } from './AutoResizeTextarea';
import { useCardDragAndDrop } from '../hooks/useCardDragAndDrop';

type CardProps = {
  index: number;
  card: CardModel;
  onDelete: (id:CardModel['id']) => void;
  onUpdate: (id: CardModel['id'], updateCard: CardModel) => void;
}

function Card({index, card, onUpdate: handleUpdate, onDelete: handleDelete}:CardProps){
  const {ref, isDragging} = useCardDragAndDrop<HTMLDivElement>({
    card,
    index,
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
    const newTitle = e.target.value;
    handleUpdate(card.id, {...card, title: newTitle})
  }

  const handleDeleteClick = () => {
    handleDelete(card.id)
  }



  return(
    <Box
      ref={ref}
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
      opacity={isDragging ? 0.5 : 1}
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
      />

      <AutoresizeTextarea
        value={card.title}
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