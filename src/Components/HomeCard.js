import React from 'react';
import { Box, Image, Badge } from "@chakra-ui/core";
import { Button } from "@chakra-ui/core";
import { useDispatch} from 'react-redux';
import { selectHome } from '../actions';




export default function HomeCard(props) {

  const dispatch = useDispatch()

  const property = {
    imageUrl: `http://localhost:3000/${props.img}`,
    imageAlt: "Rear view of modern home with pool",
    beds: props.home.bedrooms,
    baths: props.home.bathrooms,
    title: props.home.address,
    formattedPrice: props.home.rent
  };


  let setSelectedHome= home => {
    console.log('clicked')
    let homeObj = {
      property : props.home,
      uploads: props.img
    }
    dispatch(selectHome(homeObj))
  }
 
  console.log('homecard', props.img)

  return (


    <Box
    className="homeCard"
     boxShadow="lg"
      border="2px" 
      borderRadius="md" 
      borderColor="gray.200" 
      maxW="sm" 
      borderWidth="1px" 
      rounded="lg" 
      overflow="hidden">
        
      <Image width="100%" height="60%" src={property.imageUrl} alt={property.imageAlt} />

      <Box  p="6">
        <Box  d="flex" alignItems="baseline">
          <Badge rounded="full" px="2" variantColor="red">
            Hot!
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {property.title}
        </Box>

        <Box>
          ${property.formattedPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            / month
          </Box>
        </Box>
          <Button
            onClick={() => setSelectedHome(props.home)}
           variantColor="purple" variant="outline">
            See more info!
          </Button>
      </Box>
    </Box>
  );
}
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import SkipNextIcon from '@material-ui/icons/SkipNext';
// import InfoIcon from '@material-ui/icons/Info';

// const useStyles = makeStyles(theme => ({
//   card: {
//     display: 'flex',
//     margin: 15,
//     width: 500,
//   },
//   details: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   content: {
//     flex: '1 0 auto',
//   },
//   cover: {
//     width: 151,
//   },
//   controls: {
//     display: 'flex',
//     alignItems: 'center',
//     paddingLeft: theme.spacing(1),
//     paddingBottom: theme.spacing(1),
//   },
//   playIcon: {
//     height: 38,
//     width: 38,
//   },
// }));

// export default function TestCard(props) {
//   const classes = useStyles();
//   const theme = useTheme();

  

//   return (
//     <Card className={classes.card}>
//       <CardMedia
//         className={classes.cover}
//         image="https://i.picsum.photos/id/78/200/200.jpg"
//         title="Live from space album cover"
//       />
//       <div className={classes.details}>
//         <CardContent className={classes.content}>
//           <Typography component="h5" variant="h5">
//             {props.home.address}
//           </Typography>
//           <Typography variant="subtitle1" color="textSecondary">
//           Rent amount: {props.home.rent}
//           </Typography>
//         </CardContent>
//         <div className={classes.controls}>
//           <IconButton aria-label="previous">
//             <InfoIcon/>
//           </IconButton>
       
//         </div>
//       </div>
//     </Card>
//   );
// }
