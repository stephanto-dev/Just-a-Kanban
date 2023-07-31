import {Container, Heading, SimpleGrid} from '@chakra-ui/react';
import Column, { getStatusNumber } from '../../components/Column';
import { SignOut } from 'phosphor-react';
import styles from './styles.module.scss';
import AuthContext from '../../contexts/AuthContext';
import { useContext} from 'react';
import { api } from '../../services/api';
import { DragDropContext } from "react-beautiful-dnd";
import { setGlobalState } from '../../hooks/cardsHook';



export default function MainPage(){

  const { logout } = useContext(AuthContext);

  
  const {token} = JSON.parse(localStorage.getItem('tokens')!);
  
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  return(
    <>
      <div className={styles.header}>
        {/* <DarkModeIconButton position="absolute" top={0} right={2} /> */}
        {/* <DarkModeIconButton/> */}
        <SignOut 
          className={styles.logout}
          size={36}
          alt='Logout'
          onClick={logout}
        />
      </div>
        <Heading
          fontSize={{base: '4xl', sm:'5xl', md:'6xl'}}
          fontWeight="bold"
          textAlign="center"
          bgGradient="linear(to-l, #00AA11 ,#00860D)"
          bgClip="text"
          mt={4}
        
        >
          Just a Kanban.
        </Heading>
      <Container w='100%' maxWidth="container.lg" px={4} py={10}>
      <DragDropContext onDragEnd={(result) => {
        if(!result.destination) return;

        const {destination, draggableId} = result;

        const destinationColumn = getStatusNumber(destination.droppableId);

        api.put(`/card`, {
          idCard: draggableId,
          status: destinationColumn,
        }, config).then(response => {
          setGlobalState('cards', response.data);
        }
        ).catch(error => {
          console.log(error);
        }
        )
      }
      }>
        <SimpleGrid columns={{base:1, md:4}} spacing={{base:16, md:4}}>
          <Column status="TODO" />
          <Column status="IN PROGRESS"/>
          <Column status="BLOCKED"/>
          <Column status="COMPLETED"/>
        </SimpleGrid>
      </DragDropContext>
      </Container>
    </>
  )
}