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
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  videoContainer: {
    marginBottom: 20,
  },
  videoTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  webview: {
    height: 200,  // Videó magasságának beállítása
    width: '100%',
  },
});

export default VideosScreen;
