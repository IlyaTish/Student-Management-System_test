const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const filters = req.query;
    const students = await getAllStudents(filters);

    res.json(students);
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const studentData = req.body;
    const result = await addNewStudent(studentData);

    res.json(result);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const updateData = { ...req.body, id: studentId };
    const result = await updateStudent(updateData);

    res.json(result);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const student = await getStudentDetail(studentId);

    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const { status } = req.body;
    const reviewerId = req.user.id;
    
    const result = await setStudentStatus({
        userId: studentId,
        reviewerId,
        status
    });

    res.json(result);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
