import Job from "../models/Job.model.js";

export const getJobs = async (req, res) => {
  try {

    const jobs = await Job.find({ user: req.user._id }).sort({ createdAt: -1 });

    return res.json({ count: jobs.length, data: jobs });
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ message: err.message });
  }
}

export const createJob = async (req, res) => {
  try {
    const job = await Job.create({...req.body,
      user: req.user._id,});
    return res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: req.body },
      { new: true }
    );
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update job', error: err.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete job', error: err.message });
  }
};


export const updateStatus = async (req, res) => {
  try {

    console.log("req.user:", req.user); 
    
    const { id } = req.params;
    const { status } = req.body;

    // Ensure only jobs belonging to the logged-in user can be updated
    const updatedJob = await Job.findOneAndUpdate(
      { _id: id, user: req.user._id }, // match job by ID AND user
      { status },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    res.status(200).json({ data: updatedJob });
  } catch (err) {
    res.status(500).json({ message: 'Error updating job status', error: err.message });
  }
};
