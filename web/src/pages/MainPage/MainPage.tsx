import {Container, Heading, SimpleGrid} from '@chakra-ui/react';
import Column from '../../components/Column';
import { StatusType } from '../../utils/enum';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DarkModeIconButton from '../../components/DarkModeIconButton';
import { SignOut } from 'phosphor-react';
import styles from './styles.module.scss';
import AuthContext from '../../contexts/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import { CardModel } from '../../utils/models';

export default function MainPage(){
  const { logout } = useContext(AuthContext);

  const [cards, setCards] = useState<CardModel[]>([]);

  const {token} = JSON.parse(localStorage.getItem('tokens')!);

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  useEffect(() => {
    api.get('/cards', config).then(response => {
      setCards(response.data);
    })
  }, [])

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
      <DndProvider backend={HTML5Backend }>
        <SimpleGrid columns={{base:1, md:4}} spacing={{base:16, md:4}}>
          <Column status="TODO"/>
          <Column status="IN PROGRESS"/>
          <Column status="BLOCKED"/>
          <Column status="COMPLETED"/>
        </SimpleGrid>
      </DndProvider> 
      </Container>
    </>
  )
}