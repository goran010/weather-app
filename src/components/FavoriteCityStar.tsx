//icons
import { FaRegStar, FaStar } from "react-icons/fa";

//hooks
import { useState, useEffect } from "react";
import { useStoreDispatch } from "../store/hooks";

//firebase, database
import {
  updateDoc,
  DocumentReference,
  doc,
  getDoc,
} from "firebase/firestore";
//firebase, auth
import { auth, db } from "../firebase/firebase";

//actions
import { fetchCities } from "../store/worldCities-slice";

const FavoriteCityStar = ({ cityName }: { cityName: string }) => {
  const dispatch = useStoreDispatch();

  //refrence to current user document
  const [selectedCityRef, setSelectedCityRef] =
    useState<DocumentReference | null>(null);

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCities, setFavoriteCities] = useState<string[]>([]);

  useEffect(() => {
    const getStaredMovies = async () => {
      // Fetching data from Firestore
      try {
        let data;
        if (auth.currentUser) {
          const docRef = doc(db, "UsersCities", auth.currentUser?.uid);
          data = await getDoc(docRef);
          setSelectedCityRef(docRef);
        }

        // Mapping the retrieved data to return id and cities array of the first document
        const favoriteCitiesData = {
          id: data?.data()!.userUID,
          cities: data?.data()!.cities,
        }; // Returning the first document

        //showing favorite cities
        setIsFavorite(favoriteCitiesData.cities.includes(cityName));
        setFavoriteCities(favoriteCitiesData.cities);
      } catch (error) {
        console.log(error);
      }
    };
    
    //if user is looged in send request
    if (auth.currentUser) {
      getStaredMovies();
    }
  }, [cityName]); // Trigger effect when selected cityName changes

  const changeIsFavoriteStatus = async () => {
    if (auth.currentUser) {
      let newFavoriteCities: string[];
      if (isFavorite) {
        //remove city
        newFavoriteCities = favoriteCities.filter((city) => city !== cityName);
        if (favoriteCities.length < 4) {
          //add new city if arrray is too short
          const posibleCities = [
            "London",
            "Moscow",
            "Berlin",
            "Prague",
            "Tokyo",
          ].filter((city) => city !== cityName);
          newFavoriteCities.push(posibleCities[0]);
        }
      } else {
        //add new one, remove old city
        newFavoriteCities = [...favoriteCities.slice(0, 4), cityName];
      }

      if (selectedCityRef) {
        try {
          //update firebase data with new array
          await updateDoc(selectedCityRef, {
            cities: newFavoriteCities,
            userUID: auth.currentUser?.uid,
          });
          dispatch(fetchCities());
        } catch (error) {
          console.log(error);
        }
      }
      // Update state after successful update
      setIsFavorite(!isFavorite);
      setFavoriteCities(newFavoriteCities);
    } else {
      //if try to change status  isFavorite but not logged in
      alert(
        "Login to choose favorite cities. You must be logged in to select your favorite cities"
      );
    }
  };

  return (
    <>
      {isFavorite ? (
        //is favorite, full star
        <FaStar
          className="h-7 w-7 absolute top-4 right-4 cursor-pointer text-orange-500"
          onClick={() => changeIsFavoriteStatus()}
        />
      ) : (
        //is not favorite, empty star
        <FaRegStar
          className="h-7 w-7 absolute top-4 right-4 text-black cursor-pointer"
          onClick={() => changeIsFavoriteStatus()}
        />
      )}
    </>
  );
};

export default FavoriteCityStar;
