import React from 'react'
import {useTranslation} from 'react-i18next'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import {SvgProps} from 'react-native-svg'
import Button, {ButtonType} from '../components/buttons/Button'
import {GenericFn} from '../types/fn'
import {testIdWithKey} from '../utils/testable'
import LanguageListItem from '../components/listItems/LanguageListItem'
import {Theme} from '../theme'
import Begin from '../assets/img/MNNU/begin.svg'
import Request from '../assets/img/MNNU/request.svg'
import Opening from '../assets/img/MNNU/opening.svg'
import {OnboardingStyleSheet} from './Onboarding'

const {t} = useTranslation()

export const createCarouselStyle = (OnboardingTheme: any): OnboardingStyleSheet => {
  return StyleSheet.create({
    container: {
      ...OnboardingTheme.container,
      flex: 1,
      alignItems: 'center',
    },
    carouselContainer: {
      ...OnboardingTheme.carouselContainer,
      flexDirection: 'column',
    },
    pagerContainer: {
      flexShrink: 1,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
    },
    pagerDot: {
      ...OnboardingTheme.pagerDot,
      borderWidth: 1,
      borderStyle: 'solid',
    },
    pagerDotActive: {
      ...OnboardingTheme.pagerDotActive,
    },
    pagerDotInactive: {
      ...OnboardingTheme.pagerDotInactive,
    },
    pagerPosition: {
      position: 'relative',
      top: 0,
    },
    pagerNavigationButton: {
      ...OnboardingTheme.pagerNavigationButton,
      fontSize: 18,
      fontWeight: 'bold',
    },
  })
}

export const createStyles = (OnboardingTheme: any) => {
  return StyleSheet.create({
    headerText: {
      ...OnboardingTheme.headerText,
      textAlign: 'center',
    },
    bodyText: {
      ...OnboardingTheme.bodyText,
      flexShrink: 1,
      textAlign: 'center',
    },
    point: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
      marginTop: 10,
      marginRight: 20,
      marginBottom: 10,
    },
    icon: {
      marginRight: 10,
    },
  })
}

const createImageDisplayOptions = (OnboardingTheme: any) => {
  return {
    ...OnboardingTheme.imageDisplayOptions,
    height: 300,
    width: 300,
  }
}

const customPages = (onTutorialCompleted: GenericFn, OnboardingTheme: any) => {
  const styles = createStyles(OnboardingTheme)
  const imageDisplayOptions = createImageDisplayOptions(OnboardingTheme)
  return (
    <>
      <ScrollView style={{padding: 20}}>
        <View style={{marginLeft: 20, marginRight: 20, marginTop: 100}}>
          <Text style={[styles.headerText, {fontSize: 30}]}>Laten we beginnen!</Text>
          <View style={{alignItems: 'center'}}>
            <Opening {...imageDisplayOptions} />
          </View>
        </View>
      </ScrollView>
      <View style={{marginTop: 'auto', margin: 20}}>
        <Button
          title={t('Global.GetStarted')}
          accessibilityLabel={t('Global.GetStarted')}
          testID={testIdWithKey('GetStarted')}
          onPress={onTutorialCompleted}
          buttonType={ButtonType.Primary}
        />
      </View>
    </>
  )
}

const languagePage = (theme: Theme) => {
  const defaultStyle = createStyles(theme)
  return (
    <>
      <View style={{marginLeft: 20, marginRight: 20, marginTop: 100}}>
        <Text style={[defaultStyle.headerText, {fontSize: 18}]}>Choose language / Kies taal</Text>
        <Text style={[defaultStyle.bodyText, {marginTop: 20}]}>
          <LanguageListItem/>
        </Text>
      </View>
    </>
  )
}

const guides: Array<{ image: React.FC<SvgProps>; title: any; body: string }> = [
  {
    image: Begin,
    title: t('Global.Intro.Welcome'),
    body: t('Global.Intro.Continue'),
  },
  {
    image: Request,
    title: t('Global.Intro.Info1'),
    body: t('Global.Intro.Info2')
  },
]

const createPageWith = (image: React.FC<SvgProps>, title: string, body: string, OnboardingTheme: any) => {
  const styles = createStyles(OnboardingTheme)
  const imageDisplayOptions = createImageDisplayOptions(OnboardingTheme)
  return (
    <ScrollView style={{padding: 20}}>
      <View style={{marginLeft: 20, marginRight: 20, marginTop: 100}}>
        <Text style={[styles.headerText, {fontSize: 18}]} testID={testIdWithKey('HeaderText')}>
          {title}
        </Text>
        <View style={{alignItems: 'center'}}>{image(imageDisplayOptions)}</View>
        <Text style={[styles.bodyText, {marginTop: 25}]} testID={testIdWithKey('BodyText')}>
          {body}
        </Text>
      </View>
    </ScrollView>
  )
}

const OnboardingPages = (onTutorialCompleted: GenericFn, OnboardingTheme: any): Array<Element> => {
  return [
    languagePage(OnboardingTheme),
    ...guides.map((g) => createPageWith(g.image, g.title, g.body, OnboardingTheme)),
    customPages(onTutorialCompleted, OnboardingTheme),
  ]
}

export default OnboardingPages
