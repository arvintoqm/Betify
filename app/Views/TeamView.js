import React, { useState } from 'react';
import { StyleSheet, Image, View, SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';

import HawksImage from '../assets/NBATeams/Hawks.png';
import CelticsImage from '../assets/NBATeams/Celtics.png';
import NetsImage from '../assets/NBATeams/Nets.png';
import HornetsImage from '../assets/NBATeams/Hornets.png';
import BullsImage from '../assets/NBATeams/Bulls.png';
import CavsImage from '../assets/NBATeams/Cavs.png';
import MavsImage from '../assets/NBATeams/Mavs.png';
import NuggetsImage from '../assets/NBATeams/Nuggests.png';
import PistonsImage from '../assets/NBATeams/Pistons.png';
import WarriorsImage from '../assets/NBATeams/Warriors.png';
import RocketsImage from '../assets/NBATeams/Rockets.png';
import PacersImage from '../assets/NBATeams/Pacers.png';
import ClippersImage from '../assets/NBATeams/Clippers.png';
import LakersImage from '../assets/NBATeams/Logo-Los-Angeles-Lakers.png';
import GrizzliesImage from '../assets/NBATeams/Grizzles.png';
import HeatImage from '../assets/NBATeams/heat.png';
import BucksImage from '../assets/NBATeams/Bucks.png';
import TimberwolvesImage from '../assets/NBATeams/Tims.png';
import PelicansImage from '../assets/NBATeams/NOP.png';
import KnicksImage from '../assets/NBATeams/Knicks.png';
import ThunderImage from '../assets/NBATeams/OKC.png';
import MagicImage from '../assets/NBATeams/Magic.png';
import SixersImage from '../assets/NBATeams/76ers.png';
import SunsImage from '../assets/NBATeams/Suns.png';
import BlazersImage from '../assets/NBATeams/Portland.png';
import KingsImage from '../assets/NBATeams/Kings.png';
import SpursImage from '../assets/NBATeams/Spurs.png';
import RaptorsImage from '../assets/NBATeams/Raptors.png';
import JazzImage from '../assets/NBATeams/Jazz.png';
import WizardsImage from '../assets/NBATeams/Wizards.png';


export default function TeamView({navigation, route}) {

    const {screenType} = route.params;

    const [Items, setItems] = useState([
        { key: 1, team: 'Atlanta Hawks', url: HawksImage },
        { key: 2, team: 'Boston Celtics', url: CelticsImage },
        { key: 3, team: 'Brooklyn Nets', url: NetsImage },
        { key: 4, team: 'Charlotte Hornets', url: HornetsImage },
        { key: 5, team: 'Chicago Bulls', url: BullsImage },
        { key: 6, team: 'Cleveland Cavaliers', url: CavsImage },
        { key: 7, team: 'Dallas Mavericks', url: MavsImage },
        { key: 8, team: 'Denver Nuggets', url: NuggetsImage },
        { key: 9, team: 'Detroit Pistons', url: PistonsImage },
        { key: 10, team: 'Golden State Warriors', url: WarriorsImage },
        { key: 11, team: 'Houston Rockets', url: RocketsImage },
        { key: 12, team: 'Indiana Pacers', url: PacersImage },
        { key: 13, team: 'Los Angeles Clippers', url: ClippersImage },
        { key: 14, team: 'Los Angeles Lakers', url: LakersImage },
        { key: 15, team: 'Memphis Grizzlies', url: GrizzliesImage },
        { key: 16, team: 'Miami Heat', url: HeatImage },
        { key: 17, team: 'Milwaukee Bucks', url: BucksImage },
        { key: 18, team: 'Minnesota Timberwolves', url: TimberwolvesImage },
        { key: 19, team: 'New Orleans Pelicans', url: PelicansImage },
        { key: 20, team: 'New York Knicks', url: KnicksImage },
        { key: 21, team: 'Oklahoma City Thunder', url: ThunderImage },
        { key: 22, team: 'Orlando Magic', url: MagicImage },
        { key: 23, team: 'Philadelphia 76ers', url: SixersImage },
        { key: 24, team: 'Phoenix Suns', url: SunsImage },
        { key: 25, team: 'Portland Trail Blazers', url: BlazersImage },
        { key: 26, team: 'Sacramento Kings', url: KingsImage },
        { key: 27, team: 'San Antonio Spurs', url: SpursImage },
        { key: 28, team: 'Toronto Raptors', url: RaptorsImage },
        { key: 29, team: 'Utah Jazz', url: JazzImage },
        { key: 30, team: 'Washington Wizards', url: WizardsImage },
    ])
    

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Items.map((item) => {
                        return (
                            <TouchableOpacity key={item.key} onPress={() => navigation.navigate("Players",  {teamName: item.team, screenType: screenType})}>
                                <View style={styles.teams}>
                                    <View style={styles.logobox}>
                                        <Image style={styles.logo} source={item.url} />
                                    </View>
                                    <View style={styles.textbox}>
                                        <Text style={styles.text}>{item.team}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        flexDirection: 'column',
      },
      logo: {
        width: '100%',
        height: "100%",
        resizeMode: 'contain',
      },
      teams: {
        height: 100,
        width: '100%',
        margin: 10,
        backgroundColor: '#b1002d',
        flexDirection: 'row',
      },
      text: {
        color: '#fff',
        fontSize: 30,
        margin: 10,
      },
      logobox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textbox:{
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
      }
})
