import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TextInput, Alert, Modal, Button } from 'react-native';
import Ip from './Ip';

export default function ProfileScreenBelepett({id}) {
    const [adatok, setAdatok] = useState([]);
    const [szurtAdatok, setSzurtAdatok] = useState([]);
    const [loading, setLoading] = useState(true);
    const [kereso, setKereso] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState(""); // Üzenet állapot

    // Funkció, amely visszaadja a mai dátumot "YYYY-MM-DD" formátumban
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // hónap 1-től kezdődik
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

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

    const openModal = (user) => {
        setSelectedUser(user);
        setModalVisible(true);
        setMessage(""); // Üzenet törlése, amikor új modális ablakot nyitunk
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedUser(null);
        setMessage(""); // Üzenet törlése modális bezárásakor
    };

    const handleSendMessage = async(user) => {
        if (message.trim()) {
            const adatok = {
                "bevitel1": id,
                "bevitel2": user.fel_id,
                "bevitel3": message,
                "bevitel4": getTodayDate() // A mai dátum beállítása
            };

            try {
                const response = await fetch(`${Ip.Ipcim}uzenetfelvitel`, {
                    method: "POST",
                    body: JSON.stringify(adatok),
                    headers: {"Content-type": "application/json; charset=UTF-8"}
                });

                const result = await response.text();
                Alert.alert("Üzenet küldve", result);
                setMessage(""); // Üzenet törlése, miután elküldtük
                closeModal(); // A modális ablak bezárása
            } catch (error) {
                console.error("Hiba az üzenet küldésekor:", error);
                Alert.alert("Hiba", "Nem sikerült elküldeni az üzenetet.");
            }
        } else {
            Alert.alert("Hiba", "Kérem, adjon meg egy üzenetet!");
        }
    };

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
                            {/* Gomb a modális ablak megnyitásához */}
                            <Button title="További részletek" onPress={() => openModal(item)} />
                        </View>
                    )}
                    keyExtractor={(item, index) => (item.fel_id ? item.fel_id.toString() : index.toString())}
                />
            )}

            {/* Modális ablak */}
            {selectedUser && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Részletes információk</Text>
                            <Text style={styles.modalText}>Név: {selectedUser.felh_nev}</Text>

                            {/* Üzenet beviteli mező */}
                            <TextInput
                                style={styles.messageInput}
                                placeholder="Írj üzenetet..."
                                value={message}
                                onChangeText={setMessage}
                                multiline={true}
                            />

                            {/* Gombok a modális ablakban */}
                            <View style={styles.modalButtons}>
                                <Button title="Üzenet küldése" onPress={() => handleSendMessage(selectedUser)} />
                                <Button title="Bezárás" onPress={closeModal} />
                            </View>
                        </View>
                    </View>
                </Modal>
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
    kepek: {
        width: 140,
        height: 140,
        marginBottom: 10,
    },
    itemText: {
        fontStyle: "italic",
        marginBottom: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    messageInput: {
        width: "100%",
        height: 100,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        textAlignVertical: "top",
    },
    modalButtons: {
        marginTop: 10,
    },
});
