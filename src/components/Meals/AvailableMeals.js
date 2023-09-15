import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';




const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {

      const response = await fetch('https://food-delivery-app-d6281-default-rtdb.firebaseio.com/meals.json');

      if (!response.ok){
        throw new Error()
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,

        });
      }

      setMeals(loadedMeals);
      setLoading(false);

    };

    fetchMeals().catch((error) => {
      setLoading(false); // Set loading to false on error as well
      setHttpError('Something went wrong!');
    
    });

  },[]);


  const mealslist = meals.map((meal) => (<MealItem
    key={meal.id}
    id={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price}
  />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        {loading ? ( // Conditional rendering based on the loading state
          <div className={classes.loading}>
            <h3>🍔 Loading our delicious offerings...</h3>
          </div>
        ) : httpError ? ( // Conditional rendering based on the httpError state
          <section className={classes.loading}>
      <h3>{httpError}</h3>
    </section>
        ) : (
          <ul>{mealslist}</ul>
        )}
      </Card>
    </section>
  )
};

export default AvailableMeals;