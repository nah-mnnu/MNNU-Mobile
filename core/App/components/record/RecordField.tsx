import startCase from 'lodash.startcase'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { hiddenFieldValue } from '../../constants'
import { useTheme } from '../../contexts/theme'
import { BaseType } from '../../types/oca'
import { Attribute, Field } from '../../types/record'
import { testIdWithKey } from '../../utils/testable'

import RecordBinaryField from './RecordBinaryField'
import RecordDateIntField from './RecordDateIntField'

interface RecordFieldProps {
  field: Field
  hideFieldValue?: boolean
  hideBottomBorder?: boolean
  shown?: boolean
  onToggleViewPressed?: () => void
  fieldLabel?: (field: Field) => React.ReactElement | null
  fieldValue?: (field: Field) => React.ReactElement | null
}

const validEncoding = 'base64'
const validFormat = new RegExp('^image/(jpeg|png|jpg)')

const RecordField: React.FC<RecordFieldProps> = ({
  field,
  hideFieldValue = false,
  hideBottomBorder = false,
  shown = hideFieldValue ? false : true,
  onToggleViewPressed = () => undefined,
  fieldLabel = null,
  fieldValue = null,
}) => {
  const { t } = useTranslation()
  const { ListItems } = useTheme()
  const styles = StyleSheet.create({
    container: {
      ...ListItems.recordContainer,
      paddingHorizontal: 25,
      paddingTop: 16,
    },
    border: {
      ...ListItems.recordBorder,
      borderBottomWidth: 2,
      paddingTop: 12,
    },
    link: {
      ...ListItems.recordLink,
      paddingVertical: 2,
    },
    text: {
      ...ListItems.recordAttributeText,
    },
    valueContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: 10,
    },
    valueText: {
      ...ListItems.recordAttributeText,
      paddingVertical: 4,
    },
  })

  const displayAttribute = (field: Field) => {
    if (field.encoding == validEncoding && field.format && validFormat.test(field.format)) {
      return <RecordBinaryField attributeValue={(field as Attribute).value as string} shown={shown} />
    } else if (field.type == BaseType.DATEINT) {
      return <RecordDateIntField field={field} shown={shown} />
    } else {
      return (
        <Text style={styles.text} testID={testIdWithKey('AttributeValue')}>
          {shown ? (field as Attribute).value : hiddenFieldValue}
        </Text>
      )
    }
  }

  return (
    <View style={styles.container}>
      {fieldLabel ? (
        fieldLabel(field)
      ) : (
        <Text style={[ListItems.recordAttributeLabel, { fontWeight: 'bold' }]} testID={testIdWithKey('AttributeName')}>
          {field.label ?? startCase(field.name || '')}
        </Text>
      )}
      <View style={styles.valueContainer}>
        {fieldValue ? (
          fieldValue(field)
        ) : (
          <>
            <View style={styles.valueText}>{displayAttribute(field)}</View>
            {hideFieldValue ? (
              <TouchableOpacity
                accessible={true}
                accessibilityLabel={shown ? t('Record.Hide') : t('Record.Show')}
                testID={testIdWithKey('ShowHide')}
                activeOpacity={1}
                onPress={onToggleViewPressed}
                style={styles.link}
              >
                <Text style={ListItems.recordLink}>{shown ? t('Record.Hide') : t('Record.Show')}</Text>
              </TouchableOpacity>
            ) : null}
          </>
        )}
      </View>
      {<View style={[styles.border, hideBottomBorder && { borderBottomWidth: 0 }]}></View>}
    </View>
  )
}

export default RecordField
