import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaScrollView } from '../'
import SingleSelectBlock, { BlockSelection } from './../inputs/SingleSelectBlock'

import { Locales, storeLanguage } from '../../localization'

const LanguageListItem: React.FC = ({ }) => {
    const { t, i18n } = useTranslation()
    // List of available languages into the localization directory
    const languages = [
        { id: Locales.nl, value: t('Language.Dutch') },
        { id: Locales.en, value: t('Language.English') },
    ]

    /**
     * Find current set language
     */
    const storedLanguage = languages.find((l) => l.id === i18n.language)

    /**
    * Once user select the particular language from the list,
    * store user preference into the AsyncStorage
    *
    * @param {BlockSelection} language
    */
    const handleLanguageChange = async (language: BlockSelection) => {
        i18n.changeLanguage(language.id as Locales)
        await storeLanguage(language.id)
    }

    return (
        <SafeAreaScrollView>
          <SingleSelectBlock initialSelect={storedLanguage} selection={languages} onSelect={handleLanguageChange} />
        </SafeAreaScrollView>
      )
}

export default LanguageListItem