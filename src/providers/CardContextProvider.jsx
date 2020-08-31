import React, { createContext } from 'react';

import C1 from '@img/cards/C1.png';
import C2 from '@img/cards/C2.png';
import C3 from '@img/cards/C3.png';
import C4 from '@img/cards/C4.png';
import C5 from '@img/cards/C5.png';
import C6 from '@img/cards/C6.png';
import C7 from '@img/cards/C7.png';
import C8 from '@img/cards/C8.png';
import C9 from '@img/cards/C9.png';
import C10 from '@img/cards/C10.png';
import C11 from '@img/cards/C11.png';
import C12 from '@img/cards/C12.png';
import C13 from '@img/cards/C13.png';

import H1 from '@img/cards/H1.png';
import H2 from '@img/cards/H2.png';
import H3 from '@img/cards/H3.png';
import H4 from '@img/cards/H4.png';
import H5 from '@img/cards/H5.png';
import H6 from '@img/cards/H6.png';
import H7 from '@img/cards/H7.png';
import H8 from '@img/cards/H8.png';
import H9 from '@img/cards/H9.png';
import H10 from '@img/cards/H10.png';
import H11 from '@img/cards/H11.png';
import H12 from '@img/cards/H12.png';
import H13 from '@img/cards/H13.png';

import D1 from '@img/cards/D1.png';
import D2 from '@img/cards/D2.png';
import D3 from '@img/cards/D3.png';
import D4 from '@img/cards/D4.png';
import D5 from '@img/cards/D5.png';
import D6 from '@img/cards/D6.png';
import D7 from '@img/cards/D7.png';
import D8 from '@img/cards/D8.png';
import D9 from '@img/cards/D9.png';
import D10 from '@img/cards/D10.png';
import D11 from '@img/cards/D11.png';
import D12 from '@img/cards/D12.png';
import D13 from '@img/cards/D13.png';

import S1 from '@img/cards/S1.png';
import S2 from '@img/cards/S2.png';
import S3 from '@img/cards/S3.png';
import S4 from '@img/cards/S4.png';
import S5 from '@img/cards/S5.png';
import S6 from '@img/cards/S6.png';
import S7 from '@img/cards/S7.png';
import S8 from '@img/cards/S8.png';
import S9 from '@img/cards/S9.png';
import S10 from '@img/cards/S10.png';
import S11 from '@img/cards/S11.png';
import S12 from '@img/cards/S12.png';
import S13 from '@img/cards/S13.png';

// prettier-ignore
const imgSrcs = {
  C1, C2, C3, C4, C5, C6, C7, C8, C9, C10, C11, C12, C13,
  H1, H2, H3, H4, H5, H6, H7, H8, H9, H10, H11, H12, H13,
  D1, D2, D3, D4, D5, D6, D7, D8, D9, D10, D11, D12, D13,
  S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13,
};

export const CardContext = createContext();

const CardContextProvider = ({ children }) => {
  return <CardContext.Provider value={imgSrcs}>{children}</CardContext.Provider>;
};

export default CardContextProvider;
