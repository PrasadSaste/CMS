import { useEffect, useState } from "react";

import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    Stack
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import JsonRenderer from "../components/JsonRenderer";

import Loader from "../components/Loader";


const ClientDashboard = () => {

    const navigate = useNavigate();


    const [schema, setSchema] = useState([]);

    const [clients, setClients] = useState([]);


    const [formData, setFormData] = useState({
        clientName: "",
        email: ""
    });


    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(true);

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // Load schema + clients
    const loadData = async () => {

        try {

            setLoading(true);

            setError("");


            const [
                schemaResponse,
                clientsResponse
            ] = await Promise.all([

                API.get("/schema"),

                API.get("/clients")

            ]);


            setSchema(
                schemaResponse.data
            );


            setClients(
                clientsResponse.data.clients
            );


        } catch (error) {

            if (
                error.response?.status === 401
            ) {

                localStorage.removeItem(
                    "token"
                );

                navigate("/login");

                return;
            }


            setError(
                error.response?.data?.message ||
                "Failed to load data"
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadData();

    }, []);


    // Input change
    const handleInputChange = (event) => {

        setFormData({

            ...formData,

            [event.target.name]:
                event.target.value

        });


        setErrors({

            ...errors,

            [event.target.name]: ""

        });

    };


    // Validation
    const validate = () => {

        const newErrors = {};


        if (!formData.clientName.trim()) {

            newErrors.clientName =
                "Client name is required";

        }


        if (!formData.email.trim()) {

            newErrors.email =
                "Email is required";

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(formData.email)
        ) {

            newErrors.email =
                "Enter a valid email";

        }


        setErrors(newErrors);


        return (
            Object.keys(newErrors).length === 0
        );

    };


    // Add client
    const handleAddClient = async () => {

        setError("");

        setSuccess("");


        if (!validate()) {

            return;

        }


        try {

            setSubmitting(true);


            await API.post(
                "/clients",
                {
                    name: formData.clientName,
                    email: formData.email,
                    status: "Active"
                }
            );


            setFormData({
                clientName: "",
                email: ""
            });


            setSuccess(
                "Client added successfully"
            );


            // Refresh table
            const response =
                await API.get("/clients");


            setClients(
                response.data.clients
            );


        } catch (error) {

            if (
                error.response?.status === 401
            ) {

                localStorage.removeItem(
                    "token"
                );

                navigate("/login");

                return;
            }


            setError(
                error.response?.data?.message ||
                "Failed to add client"
            );

        } finally {

            setSubmitting(false);

        }

    };


    // Logout
    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        navigate("/login", {
            replace: true
        });

    };


    if (loading) {

        return <Loader />;

    }


    return (

        <Container
            maxWidth="md"
            sx={{ py: 5 }}
        >

            <Stack
                direction="row"
                justifyContent="flex-end"
                sx={{ mb: 2 }}
            >

                <Button
                    variant="outlined"
                    onClick={handleLogout}
                >
                    Logout
                </Button>

            </Stack>


            <Paper
                elevation={3}
                sx={{ p: 4 }}
            >

                {error && (

                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                    >
                        {error}
                    </Alert>

                )}


                {success && (

                    <Alert
                        severity="success"
                        sx={{ mb: 2 }}
                    >
                        {success}
                    </Alert>

                )}


                <JsonRenderer

                    schema={schema}

                    formData={formData}

                    clients={clients}

                    errors={errors}

                    onInputChange={
                        handleInputChange
                    }

                />


                <Box sx={{ mt: 3 }}>

                    <Button
                        variant="contained"
                        onClick={
                            handleAddClient
                        }
                        disabled={submitting}
                    >

                        {submitting
                            ? "Adding..."
                            : "Add Client"}

                    </Button>

                </Box>

            </Paper>

        </Container>

    );

};


export default ClientDashboard;