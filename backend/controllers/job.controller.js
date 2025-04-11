import Job from "../models/job.model.js";

export const getJobs = async (req, res) => {
  try {
    // const { status, sort } = req.query;
    // let query = {};

    // if (status) query.status = status;
    // const jobs = await Job.find(query).sort({ date: sort === 'asc' ? 1 : -1 });

    const jobs = await Job.find({});

    return res.json({ count: jobs.length, data: jobs });
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ message: err.message });
  }
}

export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    return res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const updateJob = async (req, res) => {
  try {
    const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}