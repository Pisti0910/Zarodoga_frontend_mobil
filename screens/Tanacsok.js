import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Ip from './Ip'; // Az Ip modul importálása

export default function Tanacsok({ navigation }) {
    const [adatok, setAdatok] = useState([]);
    const [szurtAdatok, setSzurtAdatok] = useState([]);
    const [kivalasztottNev, setKivalasztottNev] = useState(""); 
    const [kereso, setKereso] = useState(""); 
    const [loading, setLoading] = useState(false);

    const letoltes = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${Ip.Ipcim}Tanacsoklista`); // Az Ip modul használata az URL-hez
            if (!response.ok) {
                throw new Error(`HTTP hiba: ${response.status}`);
            }
            const data = await response.json();
            setAdatok(data);
            setSzurtAdatok(data);
        } catch (error) {
            console.error("Hiba az adatok letöltésekor:", error);
            alert("Nem sikerült letölteni az adatokat!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        letoltes();
    }, []);

    useEffect(() => {
        let filteredData = adatok;

        // Ha nincs "Összes" kiválasztva, szűrjük a nevet
        if (kivalasztottNev && kivalasztottNev !== "Összes") {
            filteredData = filteredData.filter((item) => item.Nev === kivalasztottNev);
        }

        // Keresés funkció
        if (kereso !== "") {
            filteredData = filteredData.filter(
                (item) =>
                    item.Nev.toLowerCase().includes(kereso.toLowerCase()) ||
                    item.tanacs_cim.toLowerCase().includes(kereso.toLowerCase()) ||
                    item.tanacs_szoveg.toLowerCase().includes(kereso.toLowerCase())
            );
        }

        setSzurtAdatok(filteredData);
    }, [kivalasztottNev, kereso, adatok]);

    // Kiemelés funkció
    function highlightText(text, search) {
        if (!search) return text;

        const parts = text.split(new RegExp(`(${search})`, 'gi')); // A keresett szót daraboljuk
        return parts.map((part, index) => 
            part.toLowerCase() === search.toLowerCase() 
                ? <Text key={index} style={styles.highlight}>{part}</Text>
                : part
        );
    }

    function hozzaadEgyNap(datum) {
        const ujDatum = new Date(datum);
        ujDatum.setDate(ujDatum.getDate() + 1);
        return ujDatum.toISOString().split("T")[0];
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Tanácsok</Text>

            <TextInput
                style={styles.input}
                placeholder="Keresés név, cím vagy szöveg alapján..."
                value={kereso}
                onChangeText={setKereso}
            />

            <Picker
                selectedValue={kivalasztottNev}
                onValueChange={(itemValue) => setKivalasztottNev(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Válassz egy sportolót..." value="" color="gray" />
                <Picker.Item label="Összes" value="Összes" />
                {[...new Set(adatok.map((item) => item.Nev))].map((nev, index) => (
                    <Picker.Item key={index} label={nev} value={nev} />
                ))}
            </Picker>

            {loading ? (
                <ActivityIndicator size="large" color="#FF7043" />
            ) : (
                <FlatList
                    data={szurtAdatok}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemTitle}>{highlightText(item.Nev, kereso)}</Text>
                            <Text style={styles.itemSubtitle}>{highlightText(item.tanacs_cim, kereso)}</Text>
                            <Text style={styles.itemText}>{highlightText(item.tanacs_szoveg, kereso)}</Text>
                            <Text style={styles.itemDate}>{hozzaadEgyNap(item.datum)}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id.toString()}
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
        backgroundColor: "#FFE8D6", // Halvány narancsos háttér
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#FF7043", // Narancssárga szín a címhez
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#FF7043", // Narancssárga szegély
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    picker: {
        width: "100%",
        height: 60,
        marginBottom: 20,
        backgroundColor: "#fff", // Fehér háttér a Pickernek
        borderRadius: 5,
        borderColor: "#FF7043", // Narancssárga szegély
        borderWidth: 1,
    },
    itemContainer: {
        marginVertical: 10,
        padding: 15,
        backgroundColor: "#fff", // Fehér háttér a tanácsoknak
        borderRadius: 5,
        borderColor: "#FF7043", // Narancssárga szegély
        borderWidth: 1,
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#333",
    },
    itemSubtitle: {
        fontSize: 16,
        marginVertical: 5,
        color: "#555",
    },
    itemText: {
        fontStyle: "italic",
        marginBottom: 5,
        color: "#777",
    },
    itemDate: {
        fontSize: 14,
        color: "#555",
    },
    highlight: {
        backgroundColor: "#ffff00", // Sárga háttér szín a kiemelt szóra
        fontWeight: "bold",
    },
});
