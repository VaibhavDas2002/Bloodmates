import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PageContainer from '../components/PageContainer'
import { COLORS, SIZES, FONTS } from '../constants'
import { MaterialIcons } from '@expo/vector-icons'
import { donationRequests } from '../constants/data'
import DonationCard from '../components/DonationCard'
import timesago from 'timesago'
import { firebase } from '../config'
import { fetchDonationRequests } from '../utils/service'

const DonationRequest = ({ navigation }) => {
    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={{
                        height: 44,
                        width: 44,
                        borderRadius: 4,
                        backgroundColor: COLORS.secondaryWhite,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <MaterialIcons
                        name="keyboard-arrow-left"
                        size={24}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
                <Text style={{ ...FONTS.h4 }}>Donation Request</Text>
            </View>
        )
    }

    function renderContent() {
        const [donationRequests, setDonationRequests] = useState([])

        useEffect(async () => {
            const results = await fetchDonationRequests()
            const sorted = results.sort((a, b) => b.timestamp - a.timestamp)
            setDonationRequests(sorted)
        }, [window])

        if (donationRequests.length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ ...FONTS.h3 }}>No Donation Requests</Text>
                </View>
            )
        }

        return (
            <ScrollView>
                {donationRequests.map((donationRequest, index) => (
                    <DonationCard
                        key={index}
                        name={donationRequest.name}
                        location={donationRequest.location}
                        postedDate={donationRequest.postedDate}
                        bloodType={donationRequest.bloodType}
                        mobile={donationRequest.mobile}
                    />
                ))}
            </ScrollView>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View
                    style={{
                        marginHorizontal: 22,
                    }}
                >
                    {renderHeader()}
                    {renderContent()}
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default DonationRequest
