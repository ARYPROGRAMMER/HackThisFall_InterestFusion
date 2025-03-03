import React, { useState } from "react";
import { motion } from "framer-motion";

const StudyGroup = () => {
  const [groups, setGroups] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle creating a new group
  const addGroup = (group) => {
    setGroups([...groups, group]);
    setIsModalOpen(false); // Close modal after creating a group
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center py-6 shadow-lg">
        <h1 className="text-3xl font-bold">Study Groups</h1>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
        {/* Available Groups Section */}
        <section id="groups" className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-purple-300">
              Available Groups
            </h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
            >
              Create Group
            </motion.button>
          </div>
          <GroupList groups={groups} />
        </section>
      </main>

      {/* Modal for Creating Group */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreateGroupForm addGroup={addGroup} />
        </Modal>
      )}
    </div>
  );
};

// Modal Component
const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-gray-800 border border-purple-400 rounded-lg shadow-lg p-6 relative w-full max-w-md"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          &times;
        </button>
        {children}
      </motion.div>
    </div>
  );
};

// Component to display the list of groups
const GroupList = ({ groups }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groups.length > 0 ? (
        groups.map((group, index) => (
          <GroupCard key={index} group={group} />
        ))
      ) : (
        <p className="text-gray-400">No groups available. Create one!</p>
      )}
    </div>
  );
};

// Component to display a single group card
const GroupCard = ({ group }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gray-700 border border-purple-400 rounded-lg shadow-lg p-6 hover:shadow-xl hover:border-purple-500 transition-all duration-300 relative overflow-hidden"
    >
      {/* Glowing Border Effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 blur-md animate-pulse"></div>
      </div>
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2 text-purple-300">{group.name}</h3>
        <p className="text-gray-300 mb-4">{group.description}</p>
        <span className="text-sm text-blue-300 font-medium">
          Topic: {group.topic}
        </span>
      </div>
    </motion.div>
  );
};

// Component for the "Create Group" form
const CreateGroupForm = ({ addGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupTopic, setGroupTopic] = useState("Math");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add the new group
    addGroup({
      name: groupName,
      description: groupDescription,
      topic: groupTopic,
    });

    // Clear the form
    setGroupName("");
    setGroupDescription("");
    setGroupTopic("Math");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-gray-800 border border-purple-400 rounded-lg shadow-lg p-6 space-y-4 w-full max-w-md mx-auto"
    >
      <h2 className="text-2xl font-semibold text-purple-300 mb-4">
        Create a New Study Group
      </h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="w-full p-2 border border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white transition-all duration-300"
        required
      />
      <textarea
        placeholder="Group Description"
        value={groupDescription}
        onChange={(e) => setGroupDescription(e.target.value)}
        className="w-full p-2 border border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white transition-all duration-300"
        required
      ></textarea>
      <select
        value={groupTopic}
        onChange={(e) => setGroupTopic(e.target.value)}
        className="w-full p-2 border border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white transition-all duration-300"
      >
        <option value="Math">Math</option>
        <option value="Programming">Programming</option>
        <option value="DSA">DSA</option>
        <option value="Machine Learning">Machine Learning</option>
      </select>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-2 rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
      >
        Create Group
      </motion.button>
    </motion.form>
  );
};

export default StudyGroup;