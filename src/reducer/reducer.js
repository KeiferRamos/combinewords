import {
  ADD_CHAR,
  ADD_HINT,
  FILL_ANSWER_INDEX,
  FILL_USER_ANSWER,
  PUSH_INDEX,
  REMOVE_CHAR,
  SHIFT_INDEX,
  SET_DISABLED,
  REMOVE_DISABLED,
  ADD_HINT_CHAR,
  SET_CORRECT,
  SET_CORRECT_INDEX,
  NEXT_LEVEL,
  RESET,
  FILL_SELECTION,
} from "../actions/actions";

function reducer(state, action) {
  if (action.type == FILL_USER_ANSWER) {
    return { ...state, userAnswer: action.payload };
  }
  if (action.type == FILL_SELECTION) {
    return { ...state, answerContainer: action.payload };
  }
  if (action.type == FILL_ANSWER_INDEX) {
    return { ...state, answerIndex: action.payload };
  }
  if (action.type == ADD_CHAR) {
    return {
      ...state,
      userAnswer: state.userAnswer.map((e, i) => {
        if (i == action.payload[1]) {
          return action.payload[0];
        }
        return e;
      }),
    };
  }
  if (action.type == SHIFT_INDEX) {
    return {
      ...state,
      answerIndex: state.answerIndex.filter((e, i) => i > 0),
    };
  }
  if (action.type == PUSH_INDEX) {
    return {
      ...state,
      answerIndex: [...state.answerIndex, action.payload].sort((a, b) => a - b),
    };
  }
  if (action.type == REMOVE_CHAR) {
    return {
      ...state,
      userAnswer: state.userAnswer.map((e, i) =>
        i == action.payload ? { text: "", origIndex: null } : e
      ),
    };
  }
  if (action.type == ADD_HINT) {
    return {
      ...state,
      hints: [...state.hints, action.payload],
      userCoins: state.userCoins - 50,
    };
  }
  if (action.type == SET_DISABLED) {
    return { ...state, disabledBtn: [...state.disabledBtn, action.payload] };
  }
  if (action.type == REMOVE_DISABLED) {
    return {
      ...state,
      disabledBtn: state.disabledBtn.filter((e) => e != action.payload),
    };
  }
  if (action.type == ADD_HINT_CHAR) {
    return {
      ...state,
      answerIndex: state.answerIndex.filter((e, i) => e !== action.payload),
    };
  }
  if (action.type == SET_CORRECT_INDEX) {
    return {
      ...state,
      correctIndex: state.correctIndex.filter((e) => {
        return e.index !== action.payload;
      }),
    };
  }
  if (action.type == NEXT_LEVEL) {
    return {
      ...state,
      level: state.level + 1,
      disabledBtn: [],
      hints: [],
      correctIndex: [],
      userCoins: state.userCoins + 25,
    };
  }
  if (action.type == SET_CORRECT) {
    return {
      ...state,
      correctIndex: action.payload,
    };
  }
  if (action.type == RESET) {
    return {
      ...state,
      level: 0,
      userAnswer: [],
      disabledBtn: [],
      hints: [],
      correctIndex: [],
    };
  }
  return state;
}

export default reducer;
