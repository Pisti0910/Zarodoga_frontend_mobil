import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TextInput, Alert } from 'react-native';
import Ip from './Ip';

export default function ProfileScreen() {
    const [adatok, setAdatok] = useState([]);
    const [szurtAdatok, setSzurtAdatok] = useState([]);
    const [loading, setLoading] = useState(true);
    const [kereso, setKereso] = useState("");

    const letoltes = async () => {
        try {
            const response = await fetch(Ip.Ipcim + "felhasznalok");
            if (!response.ok) {
                throw new Error(`Hiba a letöltés során: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setAdatok(data);
            setSzurtAdatok(data);
        } catch (error) {
            console.error("Hiba az adatok betöltésekor:", error.message);
            Alert.alert("Hiba", "Nem sikerült betölteni az adatokat. Kérjük, próbálja meg később.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        letoltes();
    }, []);

    useEffect(() => {
        const filteredData = adatok.filter((item) =>
            item.felh_nev && item.felh_nev.toLowerCase().includes(kereso.toLowerCase())
        );
        setSzurtAdatok(filteredData);
    }, [kereso, adatok]);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Felhasználók</Text>

            {/* Keresőmező */}
            <TextInput
                style={styles.input}
                placeholder="Keresés név alapján..."
                value={kereso}
                onChangeText={(text) => setKereso(text)}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={szurtAdatok}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemTitle}>{item.felh_nev || "Név nincs megadva"}</Text>
                            <Image
                                source={{ uri: Ip.Ipcim + (item.felh_kep || "default.jpg") }}
                                style={styles.kepek}
                                onError={() => console.warn("Hiba a kép betöltésénél: " + item.felh_kep)}
                            />
                            <Text style={styles.itemText}>Email címe: {item.felh_email || "N/A"}</Text>
                            <Text style={styles.itemText}>Neme: {item.felh_nem || "N/A"}</Text>
                            <Text style={styles.itemText}>Magasság: {item.felh_mag || "N/A"} cm</Text>
                            <Text style={styles.itemText}>Testtömeg: {item.felh_suly || "N/A"} kg</Text>
                            <Text style={styles.itemText}>Mit nem szeret enni: {item.felh_nemszeret || "N/A"}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => (item.fel_id ? item.fel_id.toString() : index.toString())}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        padding: 20,
        backgroundColor: "#FFFAF0", // Világos narancssárga háttér
    },
    header: {
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 30,
        textAlign: "center",
        color: "#FF5733", // Narancssárga szín
    },
    input: {
        width: "100%",
        height: 50,
        borderColor: "#FF7F50", // Narancssárga árnyalat
        borderWidth: 1,
        borderRadius: 25,
        marginBottom: 20,
        paddingHorizontal: 15,
        backgroundColor: "#FFFFFF",
        fontSize: 16,
    },
    itemContainer: {
        marginVertical: 12,
        padding: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        borderLeftWidth: 5,
        borderLeftColor: "#FF5733", // Narancssárga sáv
    },
    itemTitle: {
        fontSize: 22,
        fontWeight: "600",
        color: "#FF5733", // Narancssárga cím
        marginBottom: 10,
    },
    kepek: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginBottom: 15,
        alignSelf: "center",
    },
    itemText: {
        fontSize: 16,
        color: "#7F8C8D",
        marginBottom: 8,
    },
});