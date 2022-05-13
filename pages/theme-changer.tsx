import { Layout } from '../components/layouts'
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import Cookies from 'js-cookie'
import { GetServerSideProps } from 'next'
import axios from 'axios'

interface Props {
  theme: string
  name: string
}

const ThemeChangerPage = ({ theme, name }: Props) => {
  const [currentTheme, setCurrentTheme] = useState(theme)

  const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTheme(event.target.value)
    localStorage.setItem('theme', event.target.value)
    Cookies.set('theme', event.target.value)
  }

  const onClick = async () => {
    const { data } = await axios.get('/api/hello')
    console.log({ data })
  }

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup
              value={currentTheme}
              onChange={onThemeChange}
            >
              <FormControlLabel value="light" control={<Radio />} label="Light" />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              <FormControlLabel value="custom" control={<Radio />} label="Custom" />
            </RadioGroup>
          </FormControl>
          <Button
            onClick={onClick}
          >
            Solicitud
          </Button>
        </CardContent>
      </Card>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { theme = 'light', name = 'No name' } = req.cookies
  const validTheme = ['light', 'dark', 'custom']

  return {
    props: {
      theme: validTheme.includes(theme) ? theme : 'light',
      name
    }
  }
}

export default ThemeChangerPage
