import { PrimaryActionButton, SecondaryActionButton } from '../Buttons'

export const ButtonSet = ({
  showSubmitButton,
  isActive,
  advanceForm,
  recedeForm,
  isSubmitting,
  showRecedeButton,
  value,
  error
}) => {
  return (
    <div className="flex justify-between items-center mt-3 w-full">
      {showSubmitButton ? (
        <PrimaryActionButton type="submit" disabled={isSubmitting || !value || error}>
          Enviar
        </PrimaryActionButton>
      ) : (
        <PrimaryActionButton
          onClick={advanceForm}
          clickOnKey="Enter"
          isActive={isActive}
          disabled={!value || error}
        >
          Ok
        </PrimaryActionButton>
      )}
      {showRecedeButton && (
        <SecondaryActionButton onClick={recedeForm}>Voltar</SecondaryActionButton>
      )}
    </div>
  )
}
