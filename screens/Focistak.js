import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity, Linking, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'; // Import Dropdown
import Ip from './Ip';

export default function Focistak({ navigation }) {
    const [adatok, setAdatok] = useState([]);
    const [szurtAdatok, setSzurtAdatok] = useState([]);
    const [loading, setLoading] = useState(true);
    const [kereso, setKereso] = useState("");
    const [allampolgarsagSzuro, setAllampolgarsagSzuro] = useState("");

    const letoltes = async () => {
        try {
            const response = await fetch(Ip.Ipcim + "Sportoloklista");
            const data = await response.json();

            // Rendezzük az adatokat, hogy a külföldiek előbb jöjjenek
            data.sort((a, b) => {
                const aIsForeign = !a.Allampolgarsag.toLowerCase().includes("magyar");
                const bIsForeign = !b.Allampolgarsag.toLowerCase().includes("magyar");
                // Külföldiek előre, magyarok a végére
                return aIsForeign === bIsForeign ? 0 : aIsForeign ? -1 : 1;
            });

            setAdatok(data);
            setSzurtAdatok(data);
        } catch (error) {
            console.error("Hiba az adatok betöltésekor:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        letoltes();
    }, []);

    useEffect(() => {
        const filteredData = adatok.filter((item) =>
            item.Nev && item.Nev.toLowerCase().includes(kereso.toLowerCase())
        );

        const filteredByCountry = allampolgarsagSzuro
            ? filteredData.filter((item) => item.Allampolgarsag && item.Allampolgarsag.toLowerCase().includes(allampolgarsagSzuro.toLowerCase()))
            : filteredData;

        setSzurtAdatok(filteredByCountry);
    }, [kereso, allampolgarsagSzuro, adatok]);

    // Dropdown options for "állampolgárság" (Citizenship)
    const citizenshipOptions = [
        { label: 'Összes', value: '' },
        { label: 'Magyar', value: 'magyar' },
        { label: 'Angol', value: 'angol' },
        { label: 'Spanyol', value: 'spanyol' },
        { label: 'Német', value: 'nemet' },
        { label: 'Francia', value: 'francia' },
        { label: 'Olasz', value: 'olasz' },
        { label: 'Portugál', value: 'portugál' },
        { label: 'Brazíliai', value: 'brazil' },
        { label: 'Argentin', value: 'argentin' },
        { label: 'Belgiumi', value: 'belgium' },
        { label: 'Egyiptomi', value: 'egyiptomi' },
    ];
    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Focisták</Text>
            
            {/* Keresés név alapján */}
            <TextInput
                style={styles.input}
                placeholder="Keresés név alapján..."
                value={kereso}
                onChangeText={(text) => setKereso(text)}
            />

            {/* Szűrő az állampolgárságra - Dropdown */}
            <Dropdown
                style={styles.dropdown}
                data={citizenshipOptions} // Use the citizenship options
                labelField="label"
                valueField="value"
                placeholder="Válassz állampolgárságot"
                value={allampolgarsagSzuro}
                onChange={(item) => setAllampolgarsagSzuro(item.value)}  // Set the selected citizenship
            />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={szurtAdatok}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemTitle}>{item.Nev || "Név nincs megadva"}</Text>
                            <Image
                                source={{ uri: Ip.Ipcim + (item.Kepek || "default.jpg") }}
                                style={styles.kepek}
                                onError={() => console.warn("Hiba a kép betöltésénél: " + item.Kepek)}
                            />
                            <Text style={styles.itemText}>Neme: {item.Nem || "N/A"}</Text>
                            <Text style={styles.itemText}>Kora: {item.Kor || "N/A"}</Text>
                            <Text style={styles.itemText}>Állampolgárság: {item.Allampolgarsag || "N/A"}</Text>
                            <Text style={styles.itemText}>Magasság: {item.Magassag || "N/A"} cm</Text>
                            <Text style={styles.itemText}>Testtömeg: {item.Suly || "N/A"} kg</Text>
                            <Text style={styles.itemText}>Poszt: {item.Pozicio || "N/A"}</Text>
                            <Text style={styles.itemText}>Jelenlegi klubja: {item.Jelenlegi_csapata || "N/A"}</Text>
                            <Text style={styles.itemText}>Volt klubja(i): {item.Elozo_Csapatai || "N/A"}</Text>
                            <Text style={styles.itemText}>Státusza: {item.Statusza || "N/A"}</Text>
                            <TouchableOpacity 
                                style={styles.button} 
                                onPress={() => Linking.openURL(item.wikipedia)}>
                                <Text style={{color:"white"}}>{item.Nev} wikipédia oldala</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => (item.ID ? item.ID.toString() : index.toString())}
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
        backgroundColor: "#FFF5E1", // Halvány narancssárga háttér
    },
    header: {
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#D98A47", // Narancssárga szín a címszövegekhez
    },
    input: {
        width: "100%",
        height: 45,
        borderColor: "#F8C58C", // Halvány narancs szín a kontúroknál
        borderWidth: 1,
        borderRadius: 10, // Lekerekített sarkok
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: "#FFF0E1", // Halvány narancssárga háttér az inputoknak
    },
    dropdown: {
        width: "100%",
        height: 45,
        borderColor: "#F8C58C", // Halvány narancs szín a kontúroknál
        borderWidth: 1,
        borderRadius: 10, // Lekerekített sarkok
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: "#FFF0E1", // Halvány narancssárga háttér a dropdown-nak
    },
    itemContainer: {
        marginVertical: 12,
        padding: 15,
        backgroundColor: "#FCE3C5", // Halvány narancssárga háttér
        borderRadius: 10, // Lekerekített sarkok
        shadowColor: "#000", // Árnyék a jobb megjelenésért
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    itemTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#D98A47", // Narancssárga szín a címszövegekhez
    },
    kepek: {
        width: 140,
        height: 140,
        marginBottom: 10,
        borderRadius: 10, // Kerek sarkú képek
    },
    itemText: {
        fontStyle: "italic",
        marginBottom: 5,
        color: "#D98A47", // Narancsos szöveg szín
    },
    button: {
        backgroundColor: "#FF8C42", // Erősebb narancssárga szín a gombokhoz
        padding: 12,
        marginTop: 10,
        borderRadius: 8, // Lekerekített gombok
        alignItems: "center",
        shadowColor: "#000", // Árnyék hozzáadása
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: "white", // Fehér gomb szöveg
        fontSize: 16,
    },
});

