import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Card, Text} from '@mantine/core'
import { MantineProvider } from '@mantine/core'

function App() {
  // const [count, setCount] = useState(5)


  return (
    <MantineProvider>
      <Card shadow='lg'>
        <Text>
          hallo
        </Text>
      </Card>
    </MantineProvider>
  )
}

export default App
