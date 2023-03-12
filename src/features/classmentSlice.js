import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL_JSON_SERVER = "http://localhost:5000/classments";

export const getClassments = createAsyncThunk("classments/getClassments", async () => {
  try {
    const response = await axios.get(URL_JSON_SERVER);
    return response.data;
  } catch (err) {
    console.error(err.message);
  }
  const response = await axios.get(URL_JSON_SERVER);
  return response.data;
});

export const saveClassment = createAsyncThunk("classments/saveClassment", async ({ name, city }) => {
  const response = await axios.post(URL_JSON_SERVER, {
    name,
    city,
    ma: 0,
    me: 0,
    s: 0,
    k: 0,
    gm: 0,
    gk: 0,
    point: 0,
  });
  return response.data;
});

export const updateClassment = createAsyncThunk("classments/updateClassment", async ({ homeTeam, awayTeam, homeScore, awayScore }) => {
  // get detail data terkini untuk masing2 tim dari db
  const { data: homeTeamDetail } = await axios.get(`${URL_JSON_SERVER}/${homeTeam}`);
  const { data: awayTeamDetail } = await axios.get(`${URL_JSON_SERVER}/${awayTeam}`);

  // init payload untuk update data home team
  const homeTeamUpdatePayload = {
    id: homeTeamDetail.id,
    name: homeTeamDetail.name,
    city: homeTeamDetail.city,
    ma: Number(homeTeamDetail.ma) + 1,
    me: Number(homeTeamDetail.me),
    s: Number(homeTeamDetail.s),
    k: Number(homeTeamDetail.k),
    gm: Number(homeTeamDetail.gm) + Number(homeScore),
    gk: Number(homeTeamDetail.gk) + Number(awayScore),
    point: Number(homeTeamDetail.point),
  };

  // init payload untuk update data away team
  const awayTeamUpdatePayload = {
    id: awayTeamDetail.id,
    name: awayTeamDetail.name,
    city: awayTeamDetail.city,
    ma: Number(awayTeamDetail.ma) + 1,
    me: Number(awayTeamDetail.me),
    s: Number(awayTeamDetail.s),
    k: Number(awayTeamDetail.k),
    gm: Number(awayTeamDetail.gm) + Number(awayScore),
    gk: Number(awayTeamDetail.gk) + Number(homeScore),
    point: Number(awayTeamDetail.point),
  };

  // setup jumlah menang, seri, kalah dan point

  // case home menang
  if (homeScore > awayScore) {
    homeTeamUpdatePayload.me = homeTeamDetail.me + 1;
    homeTeamUpdatePayload.point = homeTeamDetail.point + 3;
    awayTeamUpdatePayload.k = awayTeamDetail.k + 1;
  }

  // case away menang
  if (awayScore > homeScore) {
    awayTeamUpdatePayload.me = awayTeamDetail.me + 1;
    awayTeamUpdatePayload.point = awayTeamDetail.point + 3;
    homeTeamUpdatePayload.k = homeTeamDetail.k + 1;
  }

  // case imbang
  if (homeScore == awayScore) {
    homeTeamUpdatePayload.s = homeTeamDetail.s + 1;
    awayTeamUpdatePayload.s = awayTeamDetail.s + 1;
    homeTeamUpdatePayload.point = homeTeamDetail.point + 1;
    awayTeamUpdatePayload.point = awayTeamDetail.point + 1;
  }

  // update data di db
  const updateHomeTeamResponse = await axios.patch(`${URL_JSON_SERVER}/${homeTeamUpdatePayload.id}`, homeTeamUpdatePayload);
  const updateAwayTeamResponse = await axios.patch(`${URL_JSON_SERVER}/${awayTeamUpdatePayload.id}`, awayTeamUpdatePayload);

  return updateHomeTeamResponse.data;
});

const classmentEntity = createEntityAdapter({
  classmentId: (classment) => classment.id,
});

const classmentSlice = createSlice({
  name: "classment",
  initialState: classmentEntity.getInitialState(),
  extraReducers: {
    [getClassments.fulfilled]: (state, action) => {
      classmentEntity.setAll(state, action.payload);
    },
    [saveClassment.fulfilled]: (state, action) => {
      classmentEntity.addOne(state, action.payload);
    },
    [updateClassment.fulfilled]: (state, action) => {
      classmentEntity.updateOne(state, { id: action.payload.id, updates: action.payload });
    },
  },
});

export const classmentSelectors = classmentEntity.getSelectors((state) => state.classment);
export default classmentSlice.reducer;
