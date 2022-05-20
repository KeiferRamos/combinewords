import { createStore } from "redux";
import { getRandomChar, getRandnum } from "../helper/utils";
import reducer from "../reducer/reducer";
import data from "../helper/data";

const initialStore = {
  data: data,
  level: 0,
  userCoins: 200,
  solved: false,
  hints: [],
  userAnswer: [],
  answerIndex: [],
  disabledBtn: [],
  correctIndex: [],
  answerContainer: [],
  message: {
    type: "",
    text: "",
  },
  answerbox: (ans) => getRandomChar(getRandnum(ans), ans),
};

export default createStore(reducer, initialStore);
