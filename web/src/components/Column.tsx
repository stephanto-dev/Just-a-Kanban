import {AddIcon} from '@chakra-ui/icons';
import { ColumnType } from '../utils/enum';
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

const ColumnColorScheme: Record<ColumnType, string> ={
  TODO:'gray',
  'IN PROGRESS': 'blue',
  BLOCKED: 'red',
  COMPLETED: 'green'
}


function Column({column}:{column: ColumnType}){
  const {cards, addEmptyCard, deleteCard, updateCard, dropCardFrom} = useColumnCards(column);

  const {dropRef, isOver} = useColumnDrop(column, dropCardFrom);



  const columnCards = cards.map((card, index) => (
    <Card key={card.id} card={card} index={index} onDelete={deleteCard} onUpdate={updateCard}/>
  ))

  return(
    <Box>
      <Heading fontSize="md" mb={4} letterSpacing="wide" fontWeight="semibold">
        <Badge
          px={2}
          py={1}
          rounded="lg"
          colorScheme={ColumnColorScheme[column]}
        >
          {column}
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
        ref={dropRef}
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
        opacity={isOver ? 0.85 : 1}
        
      >
      {columnCards}
      </Stack>
    </Box>
  );
}

export default Column;