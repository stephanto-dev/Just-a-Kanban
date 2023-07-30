import {AddIcon} from '@chakra-ui/icons';
import { StatusType } from '../utils/enum';
import { StatusModel } from '../utils/models';
import { pickChackraRandomColor } from '../utils/helpers';
import {
  Badge,
  Box,
  Heading,
  IconButton,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import Card from './Card';
import useColumnCards from '../hooks/useColumnCards';
import useColumnDrop from '../hooks/useColumnDrop';
import { api } from '../services/api';
import {useEffect, useState} from 'react';
import { CardModel } from '../utils/models';

const ColumnColorScheme: Record<StatusType, string> ={
  TODO:'gray',
  'IN PROGRESS': 'blue',
  BLOCKED: 'red',
  COMPLETED: 'green'
}

const enum Status {
  TODO = 1,
  'IN PROGRESS' = 2,
  BLOCKED = 3,
  COMPLETED = 4
}

const statusTextMap: {[key: string]: Status} = {
  'TODO': Status.TODO,
  'IN PROGRESS': Status['IN PROGRESS'],
  'BLOCKED': Status.BLOCKED,
  'COMPLETED': Status.COMPLETED
}

function getStatusNumber(status: string): Status{
  return statusTextMap[status] || Status.TODO;
}


const {token} = JSON.parse(localStorage.getItem('tokens')!);

const config = {
  headers: {
    'Authorization': `Bearer ${token}`
  }
}

function Column({status}: {status: string}){


  useEffect(() => {
    getCards();
  }, []);


  const [cards, setCards] = useState<CardModel[]>([]);

  function getCards(){
    api.get('/cards', config).then(response => {
      const filteredCards = response.data.cards.filter((card: CardModel) => card.status.status === status);
      setCards(filteredCards);
    })
  }
  

  function addEmptyCard(){
    const card = {
      text: `New ${status} card`,
      status: getStatusNumber(status),
      color: pickChackraRandomColor('.300')
    }

    api.post('/card', card, config).then(response => {
      getCards();
    }
    ).catch(error => {
      console.log(error);
      alert(error.response.data.message)
    }
    )
  }

  function deleteCard(id: CardModel['idCard']){
    api.delete(`/card/${id}`, config).then(response => {
      getCards();
    }).catch(error => {
      console.log(error);
      alert(error.response.data.message)
    })
  }


  //Update card text after user stops typing
  function updateCard(id: CardModel['idCard'], updateCard: CardModel){
    api.put(`/card`, updateCard, config).then(response => {
      getCards();
    }).catch(error => {
      console.log(error);
      alert(error.response.data.message)
    })
  }



  const columnCards = cards.map((card, index) => (
    <Card key={index} card={card} index={card.idCard} onDelete={deleteCard} onUpdate={updateCard}/>
  ))


  // const {addEmptyCard, deleteCard, updateCard, dropCardFrom} = useColumnCards(status as StatusType);
  
  // const {cards, deleteCard, updateCard,} = await useColumnCards(column);

  // const {dropRef, isOver} = useColumnDrop(column, dropCardFrom);

  // const columnCards = cards.map((card, index) => (
  //   <Card key={card.id} card={card} index={index} onDelete={deleteCard} onUpdate={updateCard}/>
  // ))

  // const columnCards = cards.map((card, index) => (
  //   <Card key={card.idCard} card={card} index={card.idCard}/>
  // ))

  return(
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide" fontWeight="semibold">
        <Badge
          px={2}
          py={1}
          rounded="lg"
          colorScheme={ColumnColorScheme[status as StatusType]}
        >
          {status}
        </Badge>
      </Heading>
      <IconButton
        size="xs"
        w="full"
        color={useColorModeValue('gray.500','gray.400')}
        bgColor={useColorModeValue('gray.100','gray.700')}
        _hover={{bgColor: useColorModeValue('gray.500','gray.400'), color:'white'}}
        py={2}
        variant="solid"
        colorScheme='black'
        aria-label='add-card'
        icon={<AddIcon/>}
        onClick={addEmptyCard}
      />

      <Stack
        // ref={dropRef}
        direction={{base: 'row', md:'column'}}
        h={{base:300, md:600}}
        p={4}
        mt={2}
        spacing={4}
        bgColor={useColorModeValue('gray.50','gray.900')}
        rounded="lg"
        boxShadow="md"
        overflow='auto'
        w='100%'
        // opacity={isOver ? 0.85 : 1}
        
      >
      {columnCards}
      </Stack>
    </Box>
  );
}

export default Column;