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

        if (kivalasztottNev !== "") {
            filteredData = filteredData.filter((item) => item.Nev === kivalasztottNev);
        }

        if (kereso !== "") {
            filteredData = filteredData.filter(
                (item) =>
                    item.Nev.toLowerCase().includes(kereso.toLowerCase()) ||
                    item.tanacs_cim.toLowerCase().includes(kereso.toLowerCase())
            );
        }

        setSzurtAdatok(filteredData);
    }, [kivalasztottNev, kereso, adatok]);

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
                placeholder="Keresés név vagy cím alapján..."
                value={kereso}
                onChangeText={setKereso}
            />

            <Picker
                selectedValue={kivalasztottNev}
                onValueChange={(itemValue) => setKivalasztottNev(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Válassz egy sportolót..." value="" color="gray" />
                {[...new Set(adatok.map((item) => item.Nev))].map((nev, index) => (
                    <Picker.Item key={index} label={nev} value={nev} />
                ))}
            </Picker>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={szurtAdatok}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemTitle}>{item.Nev}</Text>
                            <Text style={styles.itemSubtitle}>{item.tanacs_cim}</Text>
                            <Text style={styles.itemText}>{item.tanacs_szoveg}</Text>
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
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        width: "100%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    picker: {
        width: "100%",
        height: 60,
        marginBottom: 20,
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
    itemSubtitle: {
        fontSize: 16,
        marginVertical: 5,
    },
    itemText: {
        fontStyle: "italic",
        marginBottom: 5,
    },
    itemDate: {
        fontSize: 14,
        color: "#555",
    },
});
