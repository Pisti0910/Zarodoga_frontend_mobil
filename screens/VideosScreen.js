import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview'; // WebView importálása
import Ip from './Ip'; // Az IP cím kezelésére szolgáló komponens

const VideosScreen = () => {
  const [videos, setVideos] = useState([]);  // Videók tárolása
  const [selectedTipus, setSelectedTipus] = useState('');  // Kiválasztott videó linkje

  // Videók betöltése az API-ból
  useEffect(() => {
    const letoltes = async () => {
      try {
        const response = await fetch(Ip.Ipcim + 'Video'); // Az API hívás
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setVideos(data);  // Videók tárolása
        if (data.length > 0) {
          setSelectedTipus(data[0].video_link);  // Első videó automatikus kiválasztása
        }
      } catch (error) {
        Alert.alert('Hiba', 'Nem sikerült betölteni a videókat: ' + error.message);
      }
    };
    letoltes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Videók</Text>
      {videos.length === 0 ? (
        <Text>Betöltés...</Text>
      ) : (
        <ScrollView>
          {videos.map((video, index) => (
            <View key={index} style={styles.videoContainer}>
              <Text style={styles.videoTitle}>{video.title}</Text>  {/* Videó címének megjelenítése */}
              <WebView
                source={{ uri: video.video_link }}  // Beágyazott videó URL
                style={styles.webview}
                javaScriptEnabled={true}
                domStorageEnabled={true}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE8D6', // Halvány narancsos háttér
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#D84315', // Narancsos cím
  },
  videoContainer: {
    backgroundColor: '#FFF7F1', // Világos háttér a videókhoz
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#FF7043', // Pirosas-narancs kiemelés a bal oldalon
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#6D4C41', // Meleg barna szöveg
  },
  webview: {
    height: 200, // Videó magasságának beállítása
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden', // iOS-en szükséges lehet a borderRadius alkalmazásához
  },
});


export default VideosScreen;
