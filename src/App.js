import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from "./services/api"
export default function App() {
  const [repositories, setRepositories] = useState([])

  async function handleLikeRepository(id) {
    await api.post(`/repositories/${id}/like`)
      .then(response => {
        const repositorieIndex = repositories.findIndex(repositorie => id == repositorie.id)
        let update = repositories
        console.log(response.data)
        setRepositories([])
        update[repositorieIndex] = response.data
        setRepositories(update)
      })
      .catch(erro => { console.log("catch", erro) })
  }

  useEffect(() => {
    console.log("api")
    api.get("/repositories")
      .then(response => {
        setRepositories(response.data)
        console.log(response.data)
      })
      .catch(erro => { console.log("catch", erro) })
  }, [])

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        {console.log(repositories)}
        <FlatList
          data={repositories}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <>
              <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{project.title}</Text>

                <View style={styles.techsContainer}>
                  {project.techs.map(tech => (
                    <Text style={styles.tech}>
                      {tech}
                    </Text>
                  ))}
                </View>

                <View style={styles.likesContainer}>

                  <Text
                    style={styles.likeText}
                    // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                    testID={`repository-likes-${project.id}`}
                  >
                    {project.likes} curtidas
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(project.id)}
                  // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-${project.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </View>
              {/* <Text style={styles.title}>{project.title}</Text> */}
            </>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
