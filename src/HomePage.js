import React, { useState, useEffect } from 'react';
import { Button, Card, CardMedia, CardContent, Typography, Grid, IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';

const images = [
	'https://alcohome.co.il/wp-content/uploads/2024/02/%D7%AA%D7%9E%D7%95%D7%A0%D7%94-%D7%A9%D7%9C-WhatsApp%E2%80%8F-2024-02-11-%D7%91%D7%A9%D7%A2%D7%94-10.22.23_f3a26f8d.jpg',
	'https://alcohome.co.il/wp-content/uploads/2024/03/bloom.jpg',
	'https://alcohome.co.il/wp-content/uploads/2024/03/bloom2.jpg'
];

const HomePage = () => {
	const [currentImage, setCurrentImage] = useState(0);

	const nextImage = () => {
		setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	const prevImage = () => {
		setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	useEffect(() => {
		const interval = setInterval(nextImage, 2000); // תחליף תמונה כל 3 שניות
		return () => clearInterval(interval);

	}, []);
	return (
		<>
			<div style={{ marginTop: "145px" }}>
				<video autoPlay loop controls={false} width="100%">
					<source src={process.env.PUBLIC_URL + '/wine_-_56914 (540p).mp4'} type='video/mp4' />
					Your browser does not support the video tag.
				</video>
			</div>
			<Card style={{ border: "1px solid white" }} elevetion={0}>
				<CardMedia component="img" style={{ maxHeight: '505px', width: '100%', objectFit: 'contain' }}
					image={images[currentImage]}
					alt={`Image ${currentImage + 1}`}

				/>
				<CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: "0px" }} elevetion={0}>
					{/* <Typography variant="body2" color="textSecondary" component="p">
          תמונה {currentImage + 1} מתוך {images.length}
        </Typography> */}
					<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '-50px' }}>
						<IconButton onClick={prevImage} >
							<ArrowBackIcon />
						</IconButton>
						<IconButton onClick={nextImage} >
							<ArrowForwardIcon />
						</IconButton>
					</Box>
				</CardContent>
			</Card>
			<div style={{ textAlign: "center", fontSize: "x-large", color: "#173831", fontFamily: "initial" }} >
				<p >היא חלק מרשת החנויות בתחום היינות והמשקאות האלכוהוליים ALCOHOME</p>
				<p>היא נוסדה בשנת 2005 על ידי צוות מומחים בעולם היינות והמשקאות</p>
				<p>שרצה ליצור מקום איכותי ומקצועי לקהילת החובבי יין ולצרכנים בכלל</p>
				<p>היא מציעה ללקוחותיה מגוון עשיר של יינות מרחבי העולם, כולל יינות אדומים, לבנים, יינות מוקפאים, ויינות חמים וקרים
				</p>
				<p>החנות מספקת לקוחותיה ייעוץ מקצועי על בחירת היינות המתאימים לכל אירוע או צרכים מסוימים</p>
				<p>הייעוץ ניתן על סוגי יינות, זמני השקיה, יחסי מחיר ואיכות, ועוד</p>
				<p>מארגנת באופן קבוע אירועי טעימת יין, בהם הלקוחות יכולים לנסות מגוון יינות ולקבל המלצות מהמומחים בתחום
					ALCOHOME </p>
				<p>החנות מציעה מבצעים והנחות מיוחדות ללקוחותיה, כגון הנחות על יינות מסוימים, מבצעי קנייה משתלמים ועוד</p>
				<p>צוות החנות מספק שירות לקוחות מקצועי וידידותי, ומוכן לעזור ולענות על כל שאלה או בקשה של הלקוחות</p>
			</div>
			<img style={{ width: "98.5vw" }} src={process.env.PUBLIC_URL + '/צילום מסך 2024-03-17 143017.png'} />
		</>
	);
};

export default HomePage;