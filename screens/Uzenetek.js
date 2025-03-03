import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import Ip from './Ip';

export default function ProfileScreenBelepett({ id }) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`${Ip.Ipcim}/uzenetek?felhasznalo_id=${id}`);
            if (!response.ok) {
                throw new Error(`Hiba a letöltés során: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log("Lekért üzenetek:", data);
            setMessages(data);
        } catch (error) {
            console.error("Hiba az adatok betöltésekor:", error.message);
            Alert.alert("Hiba", "Nem sikerült betölteni az üzeneteket.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [id]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Bejövő üzenetek</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : messages.length > 0 ? (
                <FlatList
                    data={messages}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemTitle}>{item.felh_nev || "Ismeretlen feladó"}</Text>
                            <Text style={styles.itemText}>Üzenet: {item.szoveg}</Text>
                            <Text style={styles.itemText}>Dátum: {item.datum}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.uzenet_id.toString()}
                />
            ) : (
                <Text style={styles.noMessages}>Nincsenek bejövő üzenetek.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        padding: 20,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    itemContainer: {
        marginVertical: 10,
        padding: 15,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    itemText: {
        fontSize: 16,
        marginBottom: 5,
    },
    noMessages: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
        color: "gray",
    }
});