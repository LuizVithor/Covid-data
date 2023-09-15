import { useCallback, useEffect, useState } from "react";
import logo from "assets/logo.png";
import { ContainerStyled } from "./styles";
import CardMemorized from "components/Card";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import useWindowSize from "hooks/useWindowSize";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {
    FormControl,
    MenuItem,
    Select,
    ThemeProvider,
    createTheme,
    Button,
} from "@mui/material";
import { getOnStateT } from "types/getOnStateT";
import { getStates } from "store/reducers/getOnState";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    bgcolor: 'background.paper',
    borderRadius: '1rem',
    boxShadow: 24,
    p: 4,
};

export default function Dashboard() {
    const dispatch = useAppDispatch();
    const [width] = useWindowSize();

    const states = useAppSelector((state) => state.getOnState);
    const countries = useAppSelector((state) => state.countries);

    const [open, setOpen] = useState(false)
    const [valueDate, setValueDate] = useState("");
    const [valueStates, setValueStates] = useState("select");
    const [valueCountries, setValueCountries] = useState("Brazil");
    const [valueSelectStates, setValueSelectStates] = useState(states);

    const handleChangeCards = () => {
        // debugger
        if (
            valueDate !== "" &&
            valueStates !== "select" &&
            valueCountries === "Brazil"
        ) {
            dispatch(
                getStates({
                    date: valueDate,
                    state: valueStates,
                    country: "brazil",
                })
            );
        } else if (
            valueDate === "" &&
            valueCountries === "Brazil" &&
            cards.states.length < 26
        ) {
            if (states.length < 26) {
                dispatch(
                    getStates({
                        date: undefined,
                        state: valueStates === "select" ? undefined : valueStates,
                        country: "brazil",
                    })
                );
            } else {
                if (valueStates === "select") {
                    setCards((prevState) => ({ ...prevState, states: states }));
                } else {
                    setCards((prevState) => ({ ...prevState, states: states.filter(item => item.state === valueStates) }));
                }
            }
        } else if (
            valueDate === "" &&
            valueStates !== "select"
        ) {
            if (states.length < 26) {
                dispatch(
                    getStates({
                        date: undefined,
                        state: valueStates,
                        country: "brazil"
                    })
                );
            } else {
                setCards((prevState) => ({ ...prevState, states: states.filter(item => item.state === valueStates) }));
            }
        }
    };

    const [cards, setCards] = useState({
        states: states,
        countries: countries,
    });

    const updateState = useCallback(() => {
        if (valueDate !== "" && valueStates !== "select") {
            setCards((prevState) => ({ ...prevState, states: states }));
        } else if (valueDate === "" && cards.states.length < 26 && valueStates === "select") {
            setCards((prevState) => ({ ...prevState, states: states }));
        }

        if (valueDate === "") {
            setValueSelectStates(states)
        }
        if (cards.countries.length < 1 && valueCountries !== "all") {
            setCards((prevState) => ({ ...prevState, countries: countries.filter(item => item.country === valueCountries) }));
        } else if (valueCountries === "all") {
            setCards((prevState) => ({ ...prevState, countries: countries }));
        } else if (cards.countries.length >= 1 && valueCountries !== "all") {
            setCards((prevState) => ({ ...prevState, countries: countries.filter(item => item.country === valueCountries) }))
        }
    }, [cards.countries.length, cards.states.length, countries, states, valueCountries, valueDate, valueStates]);

    useEffect(() => {
        updateState();
    }, [updateState, states]);

    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F3F4F6",
            }}
        >
            <ContainerStyled>
                <div
                    style={{
                        width: "100%",
                        height: "10%",
                        display: "flex",
                        paddingLeft: "30px",
                        alignItems: "center",
                        paddingRight: "30px",
                        backgroundColor: "#2C81C7",
                        borderRadius: "1rem 1rem 0 0",
                        justifyContent: "space-between",
                    }}
                >
                    <img
                        src={logo}
                        style={{
                            width: width < 426 ? "50%" : "auto",
                            height: width < 426 ? "auto" : "100%",
                        }}
                    ></img>
                    {width > 809
                        ? <div
                            style={{
                                gap: "5px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <FormControl sx={{ m: 1, width: 145 }}>
                                <ThemeProvider
                                    theme={createTheme({
                                        palette: {
                                            primary: { main: "#fff", light: "#fff" },
                                            secondary: { main: "#fff" },
                                            background: { default: "#fff", paper: "#fff" },
                                            common: { white: "#fff" },
                                        },
                                        components: {
                                            MuiMenuItem: {
                                                styleOverrides: {
                                                    root: {
                                                        backgroundColor: "white",
                                                    },
                                                },
                                            },
                                        },
                                    })}
                                >
                                    <Select
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                        onChange={(event) => {
                                            if (event.target.value !== "Brazil") setValueStates("select")
                                            setValueCountries(event.target.value);
                                        }}
                                        value={valueCountries}
                                        id="demo-multiple-name"
                                        labelId="demo-multiple-name-label"
                                        style={{
                                            backgroundColor: "white",
                                            width: "145px",
                                        }}
                                    >
                                        <MenuItem key={"all"} value={"all"}>
                                            Todos Países
                                        </MenuItem>
                                        {countries.map((item) => (
                                            <MenuItem key={item.country} value={item.country}>
                                                {item.country}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </ThemeProvider>
                            </FormControl>
                            {valueCountries === "Brazil" ? (
                                <FormControl sx={{ m: 1, width: 145 }}>
                                    {/* <InputLabel id="demo-multiple-name-label">Name</InputLabel> */}
                                    <ThemeProvider
                                        theme={createTheme({
                                            palette: {
                                                primary: { main: "#fff", light: "#fff" },
                                                secondary: { main: "#fff" },
                                                background: { default: "#fff", paper: "#fff" },
                                                common: { white: "#fff" },
                                            },
                                            components: {
                                                MuiMenuItem: {
                                                    styleOverrides: {
                                                        root: {
                                                            backgroundColor: "white",
                                                        },
                                                    },
                                                },
                                            },
                                        })}
                                    >
                                        <Select
                                            size="small"
                                            color="primary"
                                            variant="outlined"
                                            onChange={(event) => {
                                                if (event.target.value === "select") setValueDate("")
                                                setValueStates(event.target.value);
                                            }}
                                            value={valueStates}
                                            id="demo-multiple-name"
                                            labelId="demo-multiple-name-label"
                                            style={{
                                                backgroundColor: "white",
                                                width: "145px",
                                            }}
                                        >
                                            <MenuItem key={""} value={"select"}>
                                                Selecione um estado
                                            </MenuItem>
                                            {
                                                valueSelectStates.map((item) => (
                                                    <MenuItem key={item.state} value={item.state}>
                                                        {item.state}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </ThemeProvider>
                                </FormControl>
                            ) : (
                                <></>
                            )}
                            {valueStates !== "select" ? (
                                <FormControl sx={{ m: 1, width: 145 }}>
                                    {/* <InputLabel id="demo-multiple-name-label">Name</InputLabel> */}
                                    <ThemeProvider
                                        theme={createTheme({
                                            palette: {
                                                primary: { main: "#fff", light: "#fff" },
                                                secondary: { main: "#fff" },
                                                background: { default: "#fff", paper: "#fff" },
                                                common: { white: "#fff" },
                                            },
                                            components: {
                                                MuiMenuItem: {
                                                    styleOverrides: {
                                                        root: {
                                                            backgroundColor: "white",
                                                            "&.Mui-selected": {
                                                                backgroundColor: "#fff",
                                                                color: "#fff",
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        })}
                                    >
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            orientation="portrait"
                                            value={valueDate}
                                            onChange={(value: string | null) => {
                                                if (value) {
                                                    // debugger
                                                    const dataOriginal = new Date(value);
                                                    const ano = dataOriginal.getFullYear(); // Obtém o ano (por exemplo, 2023)
                                                    const mes = (dataOriginal.getMonth() + 1)
                                                        .toString()
                                                        .padStart(2, "0"); // Obtém o mês (de 0 a 11, então adicionamos 1) e formata com zero à esquerda se for menor que 10
                                                    const dia = dataOriginal
                                                        .getDate()
                                                        .toString()
                                                        .padStart(2, "0"); // Obtém o dia e formata com zero à esquerda se for menor que 10
                                                    const dataFormatada = `${ano}${mes}${dia}`;
                                                    setValueDate(dataFormatada);
                                                    return dataFormatada;
                                                }
                                                setValueDate("");
                                            }}
                                            sx={{
                                                height: "40px",
                                                borderRadius: "4px",
                                                backgroundColor: "white",
                                                border: "1px white solid",
                                            }}
                                        />
                                    </ThemeProvider>
                                </FormControl>
                            ) : (
                                <></>
                            )}
                            <ThemeProvider
                                theme={createTheme({
                                    palette: { primary: { main: "#195381" } },
                                })}
                            >
                                <Button
                                    color="primary"
                                    variant="contained"
                                    style={{ height: "40px" }}
                                    onClick={() => {
                                        handleChangeCards();
                                    }}
                                >
                                    Buscar
                                </Button>
                            </ThemeProvider>
                        </div>
                        : <ThemeProvider
                            theme={createTheme({
                                palette: { primary: { main: "#195381" } },
                            })}
                        >
                            <Button
                                color="primary"
                                variant="contained"
                                style={{ height: "30px" }}
                                onClick={() => {
                                    setOpen(true);
                                }}
                            >
                                Filtros
                            </Button>
                        </ThemeProvider>
                    }
                </div>
                <div
                    style={{
                        display: "grid",
                        minHeight: "90%",
                        gridRowGap: "15px",
                        overflowY: "scroll",
                        padding: "20px 10px",
                        gridColumnGap: "15px",
                        justifyItems: "center",
                        gridTemplateColumns: `repeat(${Math.round(
                            (width - 100) / 350
                        )}, 1fr)`,
                    }}
                >
                    {
                        valueStates === "select"
                            ? cards.countries.map(item => (
                                <CardMemorized
                                    country={item}
                                    key={item.country}
                                    name={item.country}
                                />
                            ))
                            : <></>
                    }
                    {
                        cards.countries.length <= 1 && cards.countries.some(item => item.country === "Brazil")
                            ? cards.states.length > 0
                                ? cards.states.map((item: getOnStateT) => (
                                    <CardMemorized
                                        state={item}
                                        isState={true}
                                        key={item.state}
                                        name={item.state}
                                        abreviation={item.uf}
                                    />
                                ))
                                : states.map((item: getOnStateT) => (
                                    <CardMemorized
                                        state={item}
                                        isState={true}
                                        key={item.state}
                                        name={item.state}
                                        abreviation={item.uf}
                                    />
                                ))
                            : <></>
                    }
                </div>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div
                            style={{
                                gap: "5px",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: 'column'
                            }}
                        >
                            <FormControl sx={{ m: 1, width: '80%' }}>
                                <ThemeProvider
                                    theme={createTheme({
                                        palette: {
                                            primary: { main: "#fff", light: "#fff" },
                                            secondary: { main: "#fff" },
                                            background: { default: "#fff", paper: "#fff" },
                                            common: { white: "#fff" },
                                        },
                                        components: {
                                            MuiMenuItem: {
                                                styleOverrides: {
                                                    root: {
                                                        backgroundColor: "white",
                                                    },
                                                },
                                            },
                                        },
                                    })}
                                >
                                    <Select
                                        color="primary"
                                        variant="outlined"
                                        onChange={(event) => {
                                            if (event.target.value !== "Brazil") setValueStates("select")
                                            setValueCountries(event.target.value);
                                        }}
                                        value={valueCountries}
                                        id="demo-multiple-name"
                                        labelId="demo-multiple-name-label"
                                        style={{
                                            backgroundColor: "#195381",
                                            width: "100%",
                                        }}
                                    >
                                        <MenuItem key={"all"} value={"all"}>
                                            Todos Países
                                        </MenuItem>
                                        {countries.map((item) => (
                                            <MenuItem key={item.country} value={item.country}>
                                                {item.country}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </ThemeProvider>
                            </FormControl>
                            {valueCountries === "Brazil" ? (
                                <FormControl sx={{ m: 1, width: "80%" }}>
                                    {/* <InputLabel id="demo-multiple-name-label">Name</InputLabel> */}
                                    <ThemeProvider
                                        theme={createTheme({
                                            palette: {
                                                primary: { main: "#fff", light: "#fff" },
                                                secondary: { main: "#fff" },
                                                background: { default: "#fff", paper: "#fff" },
                                                common: { white: "#fff" },
                                            },
                                            components: {
                                                MuiMenuItem: {
                                                    styleOverrides: {
                                                        root: {
                                                            backgroundColor: "white",
                                                        },
                                                    },
                                                },
                                            },
                                        })}
                                    >
                                        <Select
                                            color="primary"
                                            variant="outlined"
                                            onChange={(event) => {
                                                if (event.target.value === "select") setValueDate("")
                                                setValueStates(event.target.value);
                                            }}
                                            value={valueStates}
                                            id="demo-multiple-name"
                                            labelId="demo-multiple-name-label"
                                            style={{
                                                backgroundColor: "#195381",
                                                width: "100%",
                                            }}
                                        >
                                            <MenuItem key={""} value={"select"}>
                                                Selecione um estado
                                            </MenuItem>
                                            {
                                                valueSelectStates.map((item) => (
                                                    <MenuItem key={item.state} value={item.state}>
                                                        {item.state}
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </ThemeProvider>
                                </FormControl>
                            ) : (
                                <></>
                            )}
                            {valueStates !== "select" ? (
                                <FormControl sx={{ m: 1, width: "80%" }}>
                                    {/* <InputLabel id="demo-multiple-name-label">Name</InputLabel> */}
                                    <ThemeProvider
                                        theme={createTheme({
                                            palette: {
                                                primary: { main: "#fff", light: "#fff" },
                                                secondary: { main: "#fff" },
                                                background: { default: "#fff", paper: "#fff" },
                                                common: { white: "#fff" },
                                            },
                                            components: {
                                                MuiMenuItem: {
                                                    styleOverrides: {
                                                        root: {
                                                            backgroundColor: "white",
                                                            "&.Mui-selected": {
                                                                backgroundColor: "#fff",
                                                                color: "#fff",
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        })}
                                    >
                                        <DatePicker
                                            format="DD/MM/YYYY"
                                            orientation="portrait"
                                            value={valueDate}
                                            onChange={(value: string | null) => {
                                                if (value) {
                                                    // debugger
                                                    const dataOriginal = new Date(value);
                                                    const ano = dataOriginal.getFullYear(); // Obtém o ano (por exemplo, 2023)
                                                    const mes = (dataOriginal.getMonth() + 1)
                                                        .toString()
                                                        .padStart(2, "0"); // Obtém o mês (de 0 a 11, então adicionamos 1) e formata com zero à esquerda se for menor que 10
                                                    const dia = dataOriginal
                                                        .getDate()
                                                        .toString()
                                                        .padStart(2, "0"); // Obtém o dia e formata com zero à esquerda se for menor que 10
                                                    const dataFormatada = `${ano}${mes}${dia}`;
                                                    setValueDate(dataFormatada);
                                                    return dataFormatada;
                                                }
                                                setValueDate("");
                                            }}
                                            sx={{
                                                borderRadius: "4px",
                                                backgroundColor: "#195381",
                                                border: "1px white solid",
                                            }}
                                        />
                                    </ThemeProvider>
                                </FormControl>
                            ) : (
                                <></>
                            )}
                            <ThemeProvider
                                theme={createTheme({
                                    palette: { primary: { main: "#195381" } },
                                })}
                            >
                                <Button
                                    color="primary"
                                    variant="contained"
                                    style={{ height: "40px" }}
                                    onClick={() => {
                                        handleChangeCards();
                                        setOpen(false)
                                    }}
                                >
                                    Buscar
                                </Button>
                            </ThemeProvider>
                        </div>
                    </Box>
                </Modal>
            </ContainerStyled>
        </div>
    );
}
