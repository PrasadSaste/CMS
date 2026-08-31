import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import API from "../services/api";


const LoginPage = () => {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });


    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);


    const handleChange = (event) => {

        setFormData({
            ...formData,

            [event.target.name]:
                event.target.value
        });

    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");


        if (
            !formData.username ||
            !formData.password
        ) {

            setError(
                "username and password are required"
            );

            return;
        }


        try {

            setLoading(true);


            const response =
                await API.post(
                    "/auth/login",
                    formData
                );


            // Store JWT
            localStorage.setItem(
                "token",
                response.data.token
            );


            // Store user
            localStorage.setItem(
                "user",
                JSON.stringify(
                    response.data.user
                )
            );


            // Go to client screen
            navigate("/clients");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <Container maxWidth="sm">

            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center"
                }}
            >

                <Paper
                    elevation={4}
                    sx={{
                        width: "100%",
                        padding: 4
                    }}
                >

                    <Typography
                        variant="h4"
                        align="center"
                        sx={{ mb: 3 }}
                    >
                        Client Management
                    </Typography>


                    {error && (

                        <Alert
                            severity="error"
                            sx={{ mb: 2 }}
                        >
                            {error}
                        </Alert>

                    )}


                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >

                        <TextField
                            fullWidth
                            label="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />


                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />


                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 2 }}
                        >

                            {loading
                                ? "Logging in..."
                                : "Login"}

                        </Button>

                    </Box>

                </Paper>

            </Box>

        </Container>

    );
};


export default LoginPage;