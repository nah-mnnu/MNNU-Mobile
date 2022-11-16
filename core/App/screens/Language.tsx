import React from 'react'
import LanguageListItem from '../components/listItems/LanguageListItem'
import {Locales} from '../localization'

interface Language {
    id: Locales
    value: string
}

const Language = () => {
    return (<LanguageListItem/>)
}

export default Language
