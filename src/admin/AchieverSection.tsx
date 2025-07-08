import { useEffect, useState } from 'react';
import api from '../services/axios';
import {
    Box,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
    MenuItem,
    Avatar,
} from '@mui/material';
import { Edit, Delete, Add, Search } from '@mui/icons-material';

// Define your asset base URL (adjust as per your vite config)
const ASSET_BASE_URL = import.meta.env.VITE_ASSET_BASE_URL || '';

interface Achiever {
    id: number;
    week_ending: string;
    student_name: string;
    student_school: string;
    student_grade: string;
    school_name: string;
    school_location: string;
    school_logo: string;
}

function capitalizeWords(str: string) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
}

export default function AdminAchievers() {
    const [achievers, setAchievers] = useState<Achiever[]>([]);
    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState<Achiever | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [previewLogo, setPreviewLogo] = useState<string | null>(null);

    const [form, setForm] = useState<Omit<Achiever, 'id'>>({
        week_ending: '',
        student_name: '',
        student_school: '',
        student_grade: '',
        school_name: '',
        school_location: '',
        school_logo: '',
    });

    const fetchData = () => {
        api.get('/achievers').then(res => setAchievers(res.data));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = () => {
        const formData = new FormData();
        formData.append('week_ending', form.week_ending);
        formData.append('student_name', capitalizeWords(form.student_name));
        formData.append('student_school', capitalizeWords(form.student_school));
        formData.append('student_grade', form.student_grade);
        formData.append('school_name', capitalizeWords(form.school_name));
        formData.append('school_location', capitalizeWords(form.school_location));
        if (logoFile) {
            formData.append('school_logo', logoFile);
        }

        const request = editData
            ? api.post(`/achievers/${editData.id}?_method=PUT`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            : api.post('/achievers', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

        request.then(() => {
            fetchData();
            setOpen(false);
            setEditData(null);
            setLogoFile(null);
        });
    };

    const handleEdit = (achiever: Achiever) => {
        setEditData(achiever);
        setForm({ ...achiever });
        setLogoFile(null);
        setOpen(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            api.delete(`/achievers/${id}`).then(() => fetchData());
        }
    };

    const filtered = achievers.filter(a =>
        a.student_name.toLowerCase().includes(search.toLowerCase()) ||
        a.school_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>Manage Achievers</Typography>

            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                <TextField
                    placeholder="Search by student or school"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
                    fullWidth
                />
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => {
                        setEditData(null);
                        setForm({
                            week_ending: '',
                            student_name: '',
                            student_school: '',
                            student_grade: '',
                            school_name: '',
                            school_location: '',
                            school_logo: '',
                        });
                        setOpen(true);
                    }}
                >
                    Add New
                </Button>
            </Stack>

            <Card>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>School Details</TableCell>
                            <TableCell>Student Details</TableCell>
                            <TableCell>Week</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtered.map(a => (
                            <TableRow key={a.id}>
                                <TableCell>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar
                                            src={`${ASSET_BASE_URL}${a.school_logo}`}
                                            alt="School Logo"
                                            sx={{ width: 50, height: 50, cursor: 'pointer' }}
                                            onClick={() => setPreviewLogo(`${ASSET_BASE_URL}${a.school_logo}`)}
                                        />

                                        <Box>
                                            <Typography fontWeight={600}>{a.school_name}</Typography>
                                            <Typography variant="body2">{a.school_location}</Typography>
                                        </Box>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Typography fontWeight={600}>{a.student_name}</Typography>
                                    <Typography variant="body2">Grade {a.student_grade}</Typography>
                                    <Typography variant="body2">{a.student_school}</Typography>
                                </TableCell>
                                <TableCell>{new Date(a.week_ending).toLocaleDateString()}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleEdit(a)}><Edit /></IconButton>
                                    <IconButton color="error" onClick={() => handleDelete(a.id)}><Delete /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {/* Dialog for Add/Edit */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
                <DialogTitle>{editData ? 'Edit Achiever' : 'Add New Achiever'}</DialogTitle>
                <DialogContent>
                    <Box mt={1} mb={3}>
                        <Typography fontWeight={600} mb={1}> Week Details</Typography>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Week Ending"
                                type="date"
                                fullWidth
                                value={form.week_ending}
                                onChange={e => setForm({ ...form, week_ending: e.target.value })}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Box>

                    <Box mt={1} mb={3}>
                        <Typography fontWeight={600} mb={1}> School of the Week Details</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="School Name"
                                    fullWidth
                                    value={form.school_name}
                                    onChange={e => setForm({ ...form, school_name: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="School Location"
                                    fullWidth
                                    value={form.school_location}
                                    onChange={e => setForm({ ...form, school_location: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Button variant="outlined" component="label">
                                    Upload School Logo
                                    <input
                                        type="file"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setLogoFile(file);
                                            }
                                        }}
                                    />
                                </Button>
                                {logoFile && (
                                    <Typography fontSize="14px" color="green">
                                        Selected: {logoFile.name}
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                    </Box>

                    <Box mt={3}>
                        <Typography fontWeight={600} mb={1}> Student of the Week Details</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Student Name"
                                    fullWidth
                                    value={form.student_name}
                                    onChange={e => setForm({ ...form, student_name: e.target.value })}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    select
                                    label="Grade"
                                    fullWidth
                                    value={form.student_grade}
                                    onChange={e => setForm({ ...form, student_grade: e.target.value })}
                                >
                                    {[4, 5, 6, 7, 8, 9, 10].map(grade => (
                                        <MenuItem key={grade} value={grade.toString()}>
                                            Grade {grade}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Student School"
                                    fullWidth
                                    value={form.student_school}
                                    onChange={e => setForm({ ...form, student_school: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave}>
                        {editData ? 'Update' : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={!!previewLogo} onClose={() => setPreviewLogo(null)} maxWidth="md" fullWidth>
                <DialogContent sx={{ textAlign: 'center', p: 4 }}>
                    {previewLogo && (
                        <img
                            src={previewLogo}
                            alt="School Logo Zoom"
                            style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 8 }}
                        />
                    )}
                </DialogContent>
            </Dialog>

        </Box>

    );
}
