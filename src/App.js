import React, { useEffect, useState } from 'react';
import './App.css';
import Button from '@bit/lucasfloriani.pocdesignsystem.button';
import Card from '@bit/lucasfloriani.pocdesignsystem.card';
import Container from '@bit/lucasfloriani.pocdesignsystem.container';
import Grid from '@bit/lucasfloriani.pocdesignsystem.grid';
import Heading from '@bit/lucasfloriani.pocdesignsystem.heading';
import Paragraph from '@bit/lucasfloriani.pocdesignsystem.paragraph';
import FormField from '@bit/lucasfloriani.pocdesignsystem.form-field';

function App() {
  const [drinkName, setDrinkName] = useState('')
  const [search, setSearch] = useState('')
  const [drinks, setDrinks] = useState([])

  useEffect(() => {
    if (!search) return;
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(search)}`)
      .then(resp => resp.json())
      .then(data => setDrinks(data?.drinks ?? []))
  }, [search, setDrinks])

  useEffect(() => {
    const timeoutID = setTimeout(() => {setSearch(drinkName)}, 1000)
    return () => clearTimeout(timeoutID)
  }, [drinkName, setSearch])

  return (
    <Container>
      <Grid gap="2em">
        <Card padding="1em">
          <FormField
            id="search"
            value={drinkName}
            onChange={(event) => {
              setDrinkName(event.target.value)
            }}
            labelText="Drink Name"
          />
        </Card>
        <Grid column="1fr 1fr 1fr">
          {drinks.length > 0 && (
            drinks.map((drink) => (
              <Card key={drink.idDrink} padding="0.6em">
                <Grid gap="1em">
                  <img className="drink__image" alt={drink.strDrink} src={drink.strDrinkThumb} />
                  <Heading>{drink.strDrink}</Heading>
                  <Paragraph>{drink.strInstructions}</Paragraph>
                  <Button>Check more details</Button>
                </Grid>
              </Card>
            ))
          )}
          {drinks.length === 0 && search && (
            <Paragraph align="center" fontSize="large" style={{ gridColumn: '1 / -1' }}>No drinks found</Paragraph>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
