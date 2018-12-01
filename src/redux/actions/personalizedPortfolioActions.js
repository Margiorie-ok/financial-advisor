import ActionTypes from "./actionTypes"

export function setCurrentProportion(category, currentProportion) {
  return {
    type: ActionTypes("SET_CURRENT_PROPORTION"),
    category: category,
    current: currentProportion
  }
}

export function setDesiredProportion(category, desiredProportion) {
  return {
    type: ActionTypes("SET_DESIRED_PROPORTION"),
    category: category,
    desired: desiredProportion
  }
}

export function setCurrentAmount(category, currentAmount) {
  return {
    type: ActionTypes("SET_CURRENT_AMOUNT"),
    category: category,
    amount: currentAmount
  }
}

export function setTotalAmount(totalAmount) {
  return {
    type: ActionTypes("SET_TOTAL_AMOUNT"),
    totalAmount: totalAmount
  }
}
